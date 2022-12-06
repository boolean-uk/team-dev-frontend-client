# How to use the component `CohortsList`

## Import the component

Be aware that you may need to replace this navigation path!

```js
import CohortsList from '../../cohortsList/CohortsList.js'
```

### _That is a relative path! will very likely be different on yours_

## Render the component

The component receives some props. See `Table of props`

```jsx
<CohortsList renderHeader={Boolean} renderAddButton={Boolean} />
```

## Table of Props

| Props           | Description                                    |
| --------------- | ---------------------------------------------- |
| renderHeader    | h2 "`Cohorts`" if true, `null` if false        |
| renderAddButton | button "`Add Cohort`" that open a Popup screen |

The `renderHeader` will either render _Cohorts_ as its title, or render nothing as a Header. The `renderAddButton` will either render _Add Cohort_ button or not.

Easy huh?

## Where to find the `.js` file

> team-dev-frontend-client > src > components > cohortsList
