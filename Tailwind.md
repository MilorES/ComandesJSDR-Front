# Guía rápida de Tailwind CSS

## Archivos

- `tailwind.config.js` - Configuración de Tailwind
- `postcss.config.js` - Configuración de PostCSS
- `src/styles/global.css` - Directivas de Tailwind importadas

## Clases Tailwind más usadas

### Layout y espaciado
```jsx
className="flex"              // display: flex
className="grid"              // display: grid
className="block"             // display: block
className="hidden"            // display: none

className="p-4"               // padding: 1rem (16px)
className="px-6"              // padding-left y padding-right: 1.5rem
className="py-2"              // padding-top y padding-bottom: 0.5rem
className="m-4"               // margin: 1rem
className="mx-auto"           // margin-left y margin-right: auto (centrar)

className="w-64"              // width: 16rem
className="h-screen"          // height: 100vh
className="max-w-md"          // max-width: 28rem
```

### Flexbox y Grid
```jsx
className="flex items-center justify-between"  // Alinear vertical y horizontal
className="flex-col"                           // flex-direction: column
className="gap-4"                              // gap: 1rem

className="grid grid-cols-3"                   // 3 columnas iguales
className="grid gap-6"                         // Grid con espaciado
```

### Colores
```jsx
className="bg-blue-500"       // Background azul
className="text-white"        // Texto blanco
className="text-gray-800"     // Texto gris oscuro
className="border-gray-200"   // Borde gris claro

// Degradados
className="bg-gradient-to-r from-blue-500 to-purple-600"
```

### Tipografía
```jsx
className="text-xl"           // font-size: 1.25rem
className="font-bold"         // font-weight: 700
className="font-semibold"     // font-weight: 600
className="text-center"       // text-align: center
className="uppercase"         // text-transform: uppercase
```

### Bordes y sombras
```jsx
className="rounded-lg"        // border-radius: 0.5rem
className="rounded-full"      // border-radius: 9999px (círculo)
className="border"            // border: 1px solid
className="border-2"          // border: 2px solid

className="shadow-md"         // box-shadow mediana
className="shadow-lg"         // box-shadow grande
className="hover:shadow-xl"   // Sombra extra grande al hover
```

### Estados interactivos (hover, focus)
```jsx
className="hover:bg-blue-600"     // Cambiar fondo al hover
className="hover:scale-105"       // Aumentar tamaño al hover
className="transition-all"        // Transiciones suaves
className="duration-300"          // Duración de transición 300ms
```

### Responsive (mobile-first)
```jsx
// Por defecto es mobile, luego añades breakpoints:
className="text-sm md:text-lg lg:text-xl"
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

className="flex-col md:flex-row"  // Columna en móvil, fila en tablet+
className="hidden lg:block"       // Oculto en móvil, visible en desktop
```

### Ejemplos prácticos

#### Botón estilizado
```jsx
<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
  Click aquí
</button>
```

#### Card de producto
```jsx
<div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200">
  <h3 className="text-xl font-bold mb-2">Título</h3>
  <p className="text-gray-600">Descripción</p>
</div>
```

#### Grid responsivo
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

## Consejos

1. **Mobile-first**: Las clases sin prefijo aplican a móvil, luego añade `md:`, `lg:`, etc.
2. **Hover states**: Usa `hover:` para efectos al pasar el ratón
3. **Transiciones**: Añade `transition-all duration-300` para animaciones suaves
4. **Consistencia**: Usa la escala de espaciado de Tailwind (4, 6, 8, 12, 16...)
5. **Dark mode**: Puedes usar `dark:` para modo oscuro (configurable)

## 🚀 Personalizar

Editando `tailwind.config.js`:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui'],
      },
    },
  },
  plugins: [],
}
```
## Recursos

- [Documentación oficial](https://tailwindcss.com/docs)
- [Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind UI (componentes)](https://tailwindui.com/)
