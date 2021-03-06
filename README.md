# UI Pantry

> The ZaneRay UI Pantry is a storehouse for simply constructed, highly flexible, and carefully crafted User Interface components.  These components are not intended to cover 100% of user interface needs, but only to meet the most core requirements of a modern website.

Each component has been built in a simple yet thorough manner from a functionality standpoint, while intentionally being styled very minimally.  Each component is meant to be styled to its environment wherever it may be imported some day.

---

## Running the Styleguide

There are Vue and React packages within this library, which each share a lot of the same components, but necessary all the same components.  Each styleguide is run and developed separately.  This library is developed on top of the Styleguidist tool, which has both Vue and React verions:

### Vue

```jsx harmony
npm run vue:styleguide
```

This will run the Vue Styleguide against a local development server.

### React

```jsx harmony
npm run react:styleguide
```

This will run the React Styleguide against a local development server.

### Bundling and Publishing
All packages must be bundled before publsihing.  To do this, run

```jsx harmony
npm run bundle
```

and then:

```jsx
npm run publish
```
