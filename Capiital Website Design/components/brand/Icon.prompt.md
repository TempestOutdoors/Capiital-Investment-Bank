The one icon primitive. Flat 2D line geometry from Lucide, drawn in `currentColor` — this replaces the 3D glass renders used in the original artwork.

```jsx
<Icon name="search" size={40} />
<Icon name="atom" size={40} stroke={1.25} style={{ color: "var(--sea)" }} />
```

- Editorial sizes 20–56px at stroke 1.25; control-sized icons 16px at stroke 2.
- Never fill an icon, never stack two, never put one on a coloured chip unless the whole section is on eggshell.
- If a needed glyph is missing, take it from Lucide and add it to `PATHS` — do not draw a new one.
