One-line: switch between sibling views (transactions by year, insights by kind).

```jsx
<Tabs tabs={[{value:"all",label:"All"},{value:"ma",label:"M&A"}]}>{(cur) => <div>{cur}</div>}</Tabs>
```
