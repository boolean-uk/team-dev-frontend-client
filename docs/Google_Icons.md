# The App currently has the `Material Symbols` from [Google](https://fonts.google.com/icons) imported, so everyone can use it

## Add into the jsx

- If creating an Icon, use the `<span>` HTML element to add the icon
- Assign the `className` to be _"material-symbols-outlined"_, it is quite big, but it is what it is 😁

```html
material-symbols-outlined
```

- Within the element, add the `Icon name`. Check list of icons [here](https://fonts.google.com/icons).

```jsx
<span className="material-symbols-outlined">settings</span>
```

\_It will return this beautiful svg icon
![image](https://user-images.githubusercontent.com/71110718/204267169-efc7eedf-663c-4cd6-9e7b-1106d396dee0.png)

## What name to put within the `<span>`?

In the [Google Icons website](https://fonts.google.com/icons) you find the list of all icons. They have the `icon` preview and its `name`.

![image](https://user-images.githubusercontent.com/71110718/204267363-bb6154d0-65dc-4f0a-9086-7ec1cf24f0e3.png)

If I want to add the `delete` icon to my jsx, I would add `delete` to my span, like this:

```jsx
<span className="material-symbols-outlined">delete<span>
```

## Remember to always put the `className`

Easy huh?
🧙‍♂️
