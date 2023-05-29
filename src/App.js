import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

/*
  Given the "newsletters" array below, utilize it to create 
  an app that has the following URL structure

    /
    /newsletters
      /react
        /1
        /2
        /3
      /ui
        /1
        /2
        /3
*/

const newsletters = [
  {
    name: "React Newsletter",
    id: "react",
    description:
      "The free, weekly newsletter of the best React news, articles, projects, and more.",
    issues: [
      {
        name: "#1",
        id: "1",
        links: [
          {
            title: "Why React Hooks?",
            url: "https://ui.dev/why-react-hooks/",
          },
          {
            title: "React Render Props",
            url: "https://ui.dev/react-render-props/",
          },
          {
            title: "React Higher-order Components",
            url: "https://ui.dev/react-higher-order-components/",
          },
        ],
      },
      {
        name: "#2",
        id: "2",
        links: [
          {
            title: "Compiling vs Polyfills with Babel",
            url: "https://ui.dev/compiling-polyfills/",
          },
          {
            title: "Build your own React Router v4",
            url: "https://ui.dev/build-your-own-react-router-v4/",
          },
          {
            title: "React AHA Moments",
            url: "https://ui.dev/react-aha-moments/",
          },
        ],
      },
    ],
  },
  {
    name: "UI Newsletter",
    id: "ui",
    description:
      "The free, weekly newsletter of the best UI news, articles, projects, and more.",
    issues: [
      {
        name: "#1",
        id: "1",
        links: [
          {
            title: "Computed Property Names in JavaScript",
            url: "https://ui.dev/computed-property-names/",
          },
          {
            title: "Imperative vs Declarative Programming",
            url: "https://ui.dev/imperative-vs-declarative-programming/",
          },
          {
            title: "AngularJS: Factory vs Service vs Provider",
            url: "https://ui.dev/angularjs-factory-vs-service-vs-provider/",
          },
        ],
      },
      {
        name: "#2",
        id: "2",
        links: [
          {
            title: "Shorthand Property and Method Names in JavaScript",
            url: "https://ui.dev/shorthand-properties/",
          },
          {
            title: "JavaScript Inheritance vs Composition",
            url: "https://ui.dev/javascript-inheritance-vs-composition/",
          },
          {
            title: "var vs let vs const in JavaScript",
            url: "https://ui.dev/var-let-const/",
          },
        ],
      },
    ],
  },
];

function Issue() {
  const { idPublicaction, idIssue } = useParams();
  const { url, path } = useRouteMatch();
  console.log("url", url);
  console.log("path", path);

  const publication = newsletters.find(
    (object) => object.id === idPublicaction
  );

  const issues = publication.issues.find((object) => object.id === idIssue);
  const { name, links } = issues;

  return (
    <div>
      <hr />
      <h3>{name}</h3>
      <ul>
        {links.map(({ title, url }) => {
          return (
            <li key={title}>
              <a target="_blank" rel="noreferrer" href={url}>
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Publication() {
  const { idPublicaction } = useParams();
  const { url, path } = useRouteMatch();

  const publication = newsletters.find(
    (object) => object.id === idPublicaction
  );
  const { description, name, issues } = publication;

  return (
    <div>
      <hr />
      <h2>{name}</h2>
      <p>{description}</p>
      <ul>
        {issues.map(({ name: nameIssue, id: idIssue }) => (
          <li key={idIssue}>
            <Link to={`${url}/${idIssue}`}>{nameIssue}</Link>
          </li>
        ))}
      </ul>
      <Route path={`${path}/:idIssue`}>
        <Issue />
      </Route>
    </div>
  );
}

function Newsletters() {
  const { url, path } = useRouteMatch();

  return (
    <div>
      <h1>Newsletters</h1>
      <ul>
        {newsletters.map(({ name, id, description }) => {
          return (
            <li key={id}>
              <Link to={`${url}/${id}`}>{name}</Link>
              <p>{description}</p>
            </li>
          );
        })}
      </ul>
      <Route path={`${path}/:idPublicaction`}>
        <Publication />
      </Route>
    </div>
  );
}

function Home() {
  return <h1>HOME</h1>;
}

export default function App() {
  return (
    <Router>
      <div style={{ width: 1000, margin: "0 auto" }}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/newsletters">Newsletters</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/newsletters">
          <Newsletters />
        </Route>
      </div>
    </Router>
  );
}
