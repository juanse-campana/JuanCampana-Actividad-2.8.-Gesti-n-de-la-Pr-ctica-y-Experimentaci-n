# JuanCampana Actividad 2.8. Gestión de la Práctica y Experimentación

# Sistema de Partículas Interactivo con HTML5 Canvas

Este proyecto es una aplicación web de una sola página que demuestra el uso de la API nativa `Canvas` de HTML5 y JavaScript (Vanilla JS) para renderizar gráficos animados interactivos.

## Funcionalidades

- **Renderizado Dinámico:** Generación de 100 partículas con propiedades aleatorias (posición, velocidad, tamaño).
- **Animación Fluida:** Uso de `requestAnimationFrame` para lograr 60 FPS estables.
- **Interactividad:** Implementación de lógica de colisión circular. Las partículas reaccionan a la proximidad del cursor aumentando su tamaño y volviendo a su estado original al alejarse.
- **Diseño Responsivo:** El canvas se recalcula automáticamente si se redimensiona la ventana del navegador.

## Cómo probar la interacción

1. Abre el archivo `index.html` en cualquier navegador moderno.
2. Mueve el cursor sobre el lienzo oscuro.
3. Observa cómo las partículas cercanas al cursor "explotan" en tamaño y luego se reducen suavemente al alejarse.

## Explicación Técnica

Se utiliza la fórmula de la **Distancia Euclidiana** (Teorema de Pitágoras) dentro del bucle de actualización (`update()`) para calcular la distancia entre las coordenadas del mouse $(x_1, y_1)$ y cada partícula $(x_2, y_2)$:

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

Si $d < 100px$ (radio de acción), se altera la propiedad `size` del objeto.
