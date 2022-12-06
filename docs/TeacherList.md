# How to use the component `TeachersList`

## Import the component

- Be aware that you may need to replace this navigation path!

```js
import TeachersList from '../../teachersList/TeachersLst.js'
```

### _That is the relative path ok_

## Render the component

It must receive some props. See table

```jsx
<TeachersList renderHeading={Boolean} />
```

## Table of Props

| Props         | Description                              |
| ------------- | ---------------------------------------- |
| renderHeading | h2 "`Teachers`" if true, `null` if false |

The `renderHeading` will either render _Teachers_ as its title, or render nothing as a Header

Easy huh? 🧙‍♂️

### Where to find the `.js` file

> team-dev-frontend-client > src > components > teachersList
