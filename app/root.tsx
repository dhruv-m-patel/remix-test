import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./styles/app.css?url";
import { Fragment } from "react/jsx-runtime";
import {
  Form,
  NavLink,
  useLoaderData,
  Outlet,
  useNavigation,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { ContactRecord, createEmptyContact, getContacts } from "~/routes/data";

export { Layout } from './components/Layout';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async () => {
  const contacts = await getContacts();
  return json({ contacts });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return json({ contact });
};

export default function App() {
  const { contacts } = useLoaderData<{ contacts: ContactRecord[] }>();
  const navigation = useNavigation();

  return (
    <Fragment>
      <div id="sidebar">
        <h1>Remix Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              aria-label="Search contacts"
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            <div
              aria-hidden
              hidden={true}
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
      <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </Fragment>
  );
}
