import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStylesHref from "./styles/app.css?url";
import { Fragment } from "react/jsx-runtime";
import {
  Form,
  NavLink,
  useLoaderData,
  Outlet,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { ContactRecord, createEmptyContact, getContacts } from "~/routes/data";
import { useEffect } from "react";

export { Layout } from './components/Layout';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || undefined;
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return json({ contact });
};

export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <Fragment>
      <div id="sidebar">
        <h1>Remix Contacts</h1>
        <div>
          <Form id="search-form" role="search" onChange={(e) => submit(e.currentTarget)}>
            <input
              aria-label="Search contacts"
              defaultValue={q}
              className={searching ? "loading" : ""}
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            <div
              aria-hidden
              hidden={!searching}
              id="search-spinner"
            />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((c: ContactRecord) => (
                <li key={c.id}>
                  <NavLink
                    className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
                    to={`/contacts/${c.id}`}
                  >
                    {c.first || c.last ? `${c.first} ${c.last}` : 'No Name'}
                    {c.favorite && (
                      <span>★</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === "loading" && !searching ? "loading" : ""}>
        <Outlet />
      </div>
    </Fragment>
  );
}
