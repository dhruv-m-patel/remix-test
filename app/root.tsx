import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./styles/app.css?url";
import { Fragment } from "react/jsx-runtime";
import {
  Form,
  Link,
  useLoaderData,
  Outlet,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { ContactRecord, getContacts } from "~/routes/data";

export { Layout } from './components/Layout';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async () => {
  const contacts = await getContacts();
  return json({ contacts });
};

export default function App() {
  const { contacts } = useLoaderData<{ contacts: ContactRecord[] }>();

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
                  <Link to={`/contacts/${c.id}`}>
                    {c.first || c.last ? `${c.first} ${c.last}` : 'No Name'}
                    {c.favorite && (
                      <span>★</span>
                    )}
                  </Link>
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
      <div id="detail">
        <Outlet />
      </div>
    </Fragment>
  );
}
