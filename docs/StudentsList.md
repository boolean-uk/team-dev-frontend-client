# How to use component StudentsList

Import the component , potentially you will need to change a path from

```js
import StudentsList from './StudentsList'
```

## Render the component

This component requires props, listed below:

```jsx
<StudentsList
      user={loggedInUser}
      renderAddBtn={Boolean}
      renderInfo={false/'fullInfo'/ 'simpleInfo'}
teachersPage={Boolean}

    />

if user is a student <h1> My cohort </h1>  else  <h1> Students </h1> this handled in the component depending on the logged in user.

if renderAddBtn === true will render teacher nav with add button and more button else null.
if renderInfo=== false, nothing to render, if renderInfo === 'fullInfo' displayed cohort name, id, start date and end date, else info without dates.
if teachersPage ===true list loading all students, else single cohort


```
