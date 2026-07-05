# Componente ADN

Estado: ADN en blanco para reinvención  
Versión: 1.8  
Fase: Página principal inicial  
Última actualización: 2026-07-03

## Contexto actual

La página principal conserva la estructura editorial inicial de Portfolio, pero el ADN visual ha sido retirado por completo. El proyecto queda con un slot vacío preparado para programar una nueva dirección desde cero.

La versión 1.8 elimina el SVG inline, las bases de sección, las ramas, los peldaños, los estilos visuales del ADN y la lógica JavaScript asociada a `data-dna-*`. Se conserva únicamente `.opening-dna` como contenedor invisible para la futura reinvención.

La lectura principal sigue un orden claro:

1. profesión como elemento principal;
2. nombre como contexto visual;
3. filosofía profesional como cierre conceptual;
4. separador como pausa de transición;
5. indicador de scroll como cierre de escena;
6. secciones profesionales preparadas para una futura narrativa visual.

La composición conserva un contenedor real, `.opening-dna`, pero está vacío e invisible. Su función actual es actuar como punto de montaje técnico para la próxima versión del componente.

El SVG reutilizable de `assets/svg/dna-strand.svg` también quedó vacío, con un único slot semántico.

## Propósito narrativo

El ADN debe convertirse en el eje visual y narrativo de Portfolio. No debe funcionar como un elemento decorativo aislado, sino como una presencia que conecte la identidad del proyecto con la sensibilidad editorial de la Opening Scene.

Su función será reforzar el carácter científico, evolutivo y humano del proyecto sin convertirse en un bloque visual dominante que compita con la lectura principal.

La metáfora activa es la secuenciación y ensamblaje: el visitante va leyendo el ADN profesional de Jhon M. Cuenca base a base. La información no aparece como bloques independientes; debe sentirse como si cada sección aportara una base que se une al ADN para formar un peldaño de la molécula.

## Papel dentro de la Opening Scene

El ADN debe asumir un papel secundario en la primera versión visual, pero con identidad suficiente para anticipar la dirección del proyecto. La intención es que el componente se perciba como una presencia ambiental y conceptual, no como un objeto autónomo.

La Opening Scene debe seguir priorizando la legibilidad del texto y la calma editorial. El ADN debe reforzar esa sensación, no romperla.

## Relación con la composición editorial existente

La composición actual ya está pensada como una unidad de lectura. El componente futuro deberá integrarse sin alterar la jerarquía visual ni reordenar las relaciones entre los bloques existentes.

La prioridad sigue siendo:

- profesión como protagonista;
- nombre como contexto;
- filosofía como cierre emocional;
- separador como transición ligera;
- scroll como cierre de la experiencia.

El ADN debe entrar en la escena como un elemento de profundidad, ritmo y dirección visual.

## Reserva estructural actual

La reserva inicial se implementaba mediante `.opening-dna-reserve` dentro de la Opening Scene. En la integración 0.5 fue reemplazada por `.opening-dna`, que contiene la primera versión visual del componente.

### Observaciones de auditoría

- La reserva formaba parte del flujo vertical de la escena.
- No era visible como elemento decorativo; su presencia era meramente estructural.
- El espacio que ocupaba era muy reducido en comparación con el resto del contenido de la portada.
- No introducía una forma, un patrón ni una identidad visual.
- Su función fue preparar el lugar conceptual donde más adelante se insertó el componente.

### Riesgo de sustitución posterior

El principal riesgo al reemplazar esta reserva por el componente real es que la escena pueda perder el equilibrio editorial si el nuevo elemento se integra con una proporción o una dirección visual demasiado contundente. Por eso, la integración futura deberá respetar la calma de la composición existente.

## Composición visual propuesta

La propuesta conceptual para el componente no define aún una solución final, pero sí una dirección válida:

- el ADN será un elemento de tensión visual suave;
- su presencia debe ser elegante y discreta;
- no deberá competir con la profesión ni con la filosofía;
- deberá sentirse como una continuidad visual de la narrativa del proyecto;
- deberá aportar un cierto ritmo de lectura lateral o ambiental.

## Forma de la hélice

La forma actual resuelve una doble hélice más completa y menos abstracta que las primeras pruebas. Sus dos curvas principales se cruzan con una lectura de cinta, no solo de línea: una cadena clara domina visualmente algunos tramos y la cadena azul aporta profundidad en los cambios de plano.

Se prioriza una lectura limpia y editorial, pero con una silueta suficientemente fuerte para sostener la narrativa de la página.

## Posición y proporciones

La integración futura deberá contemplar una posición dominante en escritorio, de forma que el ADN aparezca como un elemento de apoyo narrativo sin desplazar la lectura principal.

La dirección prevista es:

- aparecer principalmente en el lado derecho en escritorio;
- poder quedar parcialmente fuera del viewport si la composición lo requiere;
- no ocupar el centro de una forma que comprometa el protagonismo de la profesión.

## Número de vueltas visibles

Se estima que el componente deberá mostrar aproximadamente entre dos y tres vueltas visibles. Esta cifra sirve como referencia de densidad visual y no como decisión final.

## Sistema de color

El sistema de color del ADN deberá respetar la paleta del design system ya establecida. Se priorizará:

- coherencia con el fondo oscuro;
- uso sutil de la línea o borde;
- contraste suficiente para ser percibido sin ser agresivo;
- una presencia muy delicada y refinada.

La versión actual reduce el énfasis morado y se apoya más en blanco clínico, azul científico y grises suaves. El tratamiento cromático sigue siendo controlado por variables y gradientes SVG.

## Profundidad visual

El componente deberá sentirse en un plano visual ligeramente distinto al texto principal, pero sin perder unidad con la escena. La profundidad podrá lograrse mediante:

- una línea sutil;
- una relación de contraste mínima;
- un movimiento delicado;
- una presencia espacial controlada.

No se contempla un tratamiento visual complejo ni dramático.

## Animación inicial

La animación inicial deberá ser lenta, discreta y ambiental. No debe sentirse como un efecto de presentación, sino como una aparición natural del componente dentro de la escena.

La dirección de la animación deberá priorizar:

- opacidad;
- desplazamiento vertical o de profundidad;
- ritmo pausado.

Se evitarán transformaciones bruscas, escalados agresivos o rotaciones innecesarias.

## Movimiento ambiental

El movimiento del ADN no debe verse como un componente animado de forma autónoma, sino como una presencia que respira dentro de la escena. El comportamiento ideal es sutil, casi imperceptible, pero suficiente para transmitir una idea de vida y continuidad.

## Comportamiento durante el scroll

Una vez que la Opening Scene cede paso a las secciones posteriores, el ADN deberá colaborar en la transición de la experiencia. La idea es que su movimiento o presencia ayude a conectar la portada con la narrativa del proyecto.

No se trata de una animación de transición aislada, sino de un elemento que también participe en la continuidad de la experiencia visual.

## Interacción

En esta fase no se define interacción avanzada. La interacción futura, si se incorpora, deberá ser discreta y accesible. La prioridad es que cualquier gesto o respuesta del componente no rompa la calma editorial de la escena.

## Adaptación responsive

### Móvil

En móvil no se copiará literalmente la composición de escritorio. La integración deberá ser más contenida y probablemente más abstracta. El ADN no debe competir con la lectura central ni ocupar un espacio que rompa la intención editorial.

### Tablet

En tablet se trabajará con una solución intermedia, cuidando el equilibrio entre lectura y presencia del componente.

### Portátil

En portátil puede comenzar a mostrarse con una mayor presencia visual, pero siempre manteniendo la jerarquía editorial del texto principal.

### Escritorio

En escritorio será donde el componente tenga mayor potencial visual. Aquí podrá aparecer lateralmente y con mayor profundidad de lectura.

### Ultrawide

En ultrawide se podrá aprovechar el espacio adicional para dar más aire al componente sin descompensar la composición. La intención sigue siendo que el ADN sirva de soporte narrativo, no de centro de atención.

## Accesibilidad

El componente debe respetar las buenas prácticas de accesibilidad. En particular:

- si el ADN es decorativo, podrá utilizar `aria-hidden="true"`;
- si más adelante se vuelve interactivo, deberá ser accesible por teclado;
- no deberá depender de información visual exclusiva;
- no deberá obstaculizar la comprensión textual del contenido principal.

## Rendimiento

El componente debe diseñarse para ser eficiente. Se priorizarán:

- estructuras simples;
- animaciones ligeras;
- uso de `transform` y `opacity`;
- ausencia de filtros SVG pesados;
- ausencia de cálculos continuos innecesarios.

## Arquitectura técnica propuesta

### HTML

El componente se integra como un contenedor dedicado, `.opening-dna`, dentro de la Opening Scene.

### SVG

El componente se diseñará con SVG como base principal, dada su idoneidad para formas vectoriales, trazos finos y animación controlada. No se contempla una implementación basada en bitmap ni en imágenes estáticas.

### CSS

El estilo del componente se gestionará de forma separada del contenido editorial, solo con reglas específicas para su propio posicionamiento, tamaño y comportamiento. No se quiere mezclar su lógica visual con la composición de texto.

### JavaScript

Se contempla JavaScript Vanilla para controlar la animación y la sincronización ambiental. Su uso será limitado y orientado a comportamiento discreto, sin introducir complejidad innecesaria.

## Relación con otros componentes

El ADN no debe entenderse como un componente aislado. Su integración futura deberá contemplar su relación con:

- la Opening Scene actual;
- la lectura editorial principal;
- el scroll vertical;
- las futuras secciones posteriores del portfolio.

## Riesgos técnicos

Los riesgos principales son:

- que el componente altere el equilibrio editorial de la portada;
- que la animación resulte demasiado evidente o excesivamente visible;
- que el rendimiento se vea afectado si se usan demasiados cálculos o trazados complejos;
- que el componente tenga una integración demasiado rígida con la estructura actual;
- que la solución no sea suficientemente adaptable entre móvil y escritorio.

## Decisiones ya tomadas

- El ADN será el eje visual y narrativo de Portfolio.
- No será una imagen estática.
- No será una decoración independiente.
- Se construirá con SVG, CSS y JavaScript Vanilla.
- No se utilizará WebGL.
- No se utilizarán librerías de animación.
- En escritorio aparecerá principalmente en el lado derecho.
- Podrá quedar parcialmente fuera del viewport.
- La composición editorial actual mantendrá prioridad de lectura.
- Se mostrarán aproximadamente entre dos y tres vueltas visibles.
- La animación será lenta, discreta y ambiental.
- Durante el scroll, el ADN deberá conectar la Opening Scene con las secciones posteriores.
- En móvil no se copiará literalmente la composición de escritorio.
- El componente deberá respetar `prefers-reduced-motion`.
- Mientras sea decorativo podrá utilizar `aria-hidden="true"`.
- Las futuras interacciones deberán ser accesibles mediante teclado.
- Las animaciones priorizarán `transform` y `opacity`.
- Se evitarán filtros SVG pesados y cálculos continuos innecesarios.
- El componente no contendrá información esencial que no exista también en formato textual.

## Decisiones pendientes

- posición exacta de la hélice;
- anchura y altura;
- orientación;
- número final de vueltas;
- nivel de recorte fuera del viewport;
- estructura interna del SVG;
- sistema de nodos;
- profundidad visual;
- respuesta al cursor;
- recorrido durante el scroll;
- relación con la siguiente sección;
- comportamiento en móvil;
- estrategia final de evolución desde `.opening-dna` hacia comportamientos narrativos durante el scroll.

## Especificación visual de la Opening Scene

### Principio de composición

La Opening Scene utilizará una composición asimétrica. El bloque editorial ocupará visualmente la zona izquierda y central izquierda. El ADN ocupará principalmente la zona derecha. El ADN no deberá presentarse como una columna independiente perfectamente delimitada. Debe sentirse como una estructura espacial que entra en la escena y continúa fuera del viewport.

El vacío entre texto y ADN será intencional y formará parte de la jerarquía visual.

### Escritorio

El bloque editorial conservará prioridad de lectura. El ADN ocupará aproximadamente entre el 45 % y el 55 % del ancho visual del viewport. Su centro visual se situará aproximadamente entre el 75 % y el 82 % del ancho del viewport. La hélice podrá sobrepasar el borde derecho. La altura visible del ADN será aproximadamente entre el 70 % y el 85 % del viewport. La hélice no debe tocar directamente el texto. Debe existir una zona de separación visual entre ambos elementos. El ADN podrá comenzar ligeramente por encima del área central y terminar fuera del límite inferior o superior. El componente tendrá mayor presencia visual que un fondo, pero menor prioridad semántica que el texto.

### Portátil

Se mantendrá la composición lateral, aunque con una escala ligeramente reducida. Se mostrará aproximadamente entre 2 y 2,5 vueltas. El recorte lateral se reducirá si el ancho disponible lo exige. Se conservará la prioridad del bloque editorial. Se evitará que el ADN comprima artificialmente la tipografía. Parte del ADN podrá moverse más hacia el borde.

### Tablet

Se mantendrá una composición asimétrica mientras exista espacio suficiente. Se reducirá el ancho ocupado por el ADN. Se mostrarán entre 1,75 y 2 vueltas reconocibles. Se disminuirá la profundidad visual y la presencia de movimiento ambiental. Se evitará la superposición directa con el bloque editorial. La transición hacia la composición móvil será progresiva.

### Móvil

La composición dejará de ser estrictamente lateral. El bloque editorial aparecerá primero. El ADN podrá situarse debajo del texto o parcialmente detrás de una zona no crítica. No deberá quedar detrás de la profesión ni del nombre. Se mostrarán aproximadamente entre 1,5 y 2 vueltas. La orientación podrá ser más vertical y centrada. La escala debe permitir reconocer la hélice sin que la Opening Scene resulte excesivamente larga. El movimiento ambiental se reducirá. La respuesta al cursor no existirá. La interacción dependerá del scroll o será completamente pasiva. El indicador de scroll debe seguir siendo visible.

### Ultrawide

No se expandirá indefinidamente la distancia entre texto y ADN. Se limitará el ancho útil de la composición mediante un contenedor máximo. Se permitirá que el ADN aumente ligeramente de escala. Se conservará el espacio negativo. Se evitará colocar contenido adicional solo para llenar la pantalla. Se mantendrá una relación visual clara entre el bloque editorial y la hélice. El ADN podrá quedar más recortado por la derecha para evitar una composición demasiado dispersa.

### Relación entre texto y ADN

El ADN nunca debe cruzar por delante del título profesional en escritorio. No debe reducir el contraste del texto. No debe ocupar el espacio inmediato del nombre ni de la filosofía. El bloque editorial debe poder leerse perfectamente aunque el ADN esté animado. El movimiento ambiental no debe atraer más atención que la profesión. La hélice podrá acercarse al bloque editorial durante el scroll, pero no en su estado inicial.

### Área segura

Debe existir un área segura alrededor del bloque editorial. Esta área impedirá que la hélice, sus nodos, sus conexiones, sus brillos o sus animaciones invadan la zona principal de lectura. El área segura incluirá profesión, nombre, filosofía, separador e indicador de scroll. No se establecen aún valores CSS exactos.

### Recorte del viewport

Entre un 10 % y un 25 % del ADN podrá quedar fuera del borde derecho. La parte superior o inferior podrá quedar parcialmente recortada. No deben recortarse simultáneamente demasiadas zonas hasta perder la forma. Al menos una zona central completa debe permanecer visible. El recorte debe sugerir continuidad, no error de layout. El componente no debe provocar scroll horizontal.

### Orientación

La hélice aparecerá en orientación predominantemente vertical. Podrá incluir una inclinación ligera de entre 6 y 12 grados. No se utilizará una orientación horizontal. La inclinación aportará dinamismo sin dificultar el reconocimiento. El eje general debe permitir que la hélice continúe visualmente hacia la siguiente sección. La dirección exacta de la inclinación sigue pendiente.

### Número de vueltas

En escritorio se mostrarán aproximadamente 2,5 vueltas. Nunca se mostrarán menos de 2 vueltas reconocibles. No se mostrarán más de 3 vueltas completas en la Opening Scene. El recorte podrá ocultar parcialmente el inicio o el final de la hélice. La escala debe permitir reconocer claramente la doble hélice y sus conexiones internas.

### Escala visual

La escala del ADN se ajustará de forma conceptual según el dispositivo. En escritorio será mayor y más presente; en móvil, más contenida; en tablet, intermedia. La idea es que el componente conserve identidad sin comprometer la lectura principal.

### Jerarquía y contraste

El ADN tendrá mayor presencia visual que un fondo, pero menor prioridad semántica que el texto. Su contraste deberá ser suficiente para ser percibido, pero no tan alto como para competir con la profesión. La composición deberá parecer calma, no saturación visual.

### Diagrama conceptual

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ÁREA EDITORIAL              ESPACIO NEGATIVO       ADN      │
│                                                              │
│  Clinical & Biomedical                              ╭──╮     │
│  Laboratory Technologist                           ╱    ╲    │
│                                                   ╲    ╱     │
│  Jhon M. Cuenca                                    ╰──╯      │
│                                                      ╲       │
│  Committed to a lifetime...                    ╭──────╮      │
│                                               ╱        ╲     │
│  ─────────────                               ╲        ╱      │
│                                               ╰──────╯       │
│  Scroll                                                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Este diagrama no representa medidas exactas ni define la forma final del SVG; solo explica la relación espacial entre las zonas.

## Criterios de aprobación

La especificación se considerará lista para prototipo cuando estén definidas:

- composición asimétrica;
- zona editorial protegida;
- área aproximada del ADN;
- orientación principal;
- número aproximado de vueltas;
- rango de recorte;
- escala por tipo de dispositivo;
- comportamiento general en móvil;
- límites de contraste;
- ausencia de scroll horizontal.

## Prototipo visual 0.1

### Objetivo

Evaluar visualmente una primera aproximación de la doble hélice como elemento aislado sobre el fondo oscuro de Portfolio, sin integrar aún la composición de la Opening Scene.

### Archivos

- prototypes/dna/index.html
- prototypes/dna/dna-prototype.css
- prototypes/dna/dna-prototype.js
- prototypes/dna/dna-prototype.svg

### Decisiones aplicadas

- Se utilizó una hélice vertical con inclinación ligera de 8 grados.
- Se representaron aproximadamente 2,5 vueltas visibles en escritorio.
- Se estructuró la forma con dos cadenas exteriores y conexiones transversales regulares.
- Se aplicó el sistema de color azul-morado sobre fondo oscuro.
- Se añadió profundidad mediante capas, opacidad y variación de grosor.
- Se incorporó movimiento ambiental muy suave mediante CSS.
- Se añadió soporte para `prefers-reduced-motion`.

### Decisiones provisionales

- La inclinación sigue siendo provisional y puede ajustarse en CSS.
- El recorte lateral y el tamaño relativo aún deben evaluarse visualmente.
- La forma interna del SVG puede cambiar según la revisión humana.
- La relación entre el ADN y el espacio negativo todavía requiere validación.

### Aspectos que deben evaluarse

- legibilidad de la doble hélice;
- claridad de las conexiones transversales;
- equilibrio entre profundidad y sutileza;
- sensación de continuidad visual;
- impacto del movimiento ambiental;
- comportamiento responsive en móvil y tablet;
- posibilidad de integrar el componente en la Opening Scene sin competir con la tipografía.

### Limitaciones conocidas

- El prototipo sigue siendo una aproximación visual aislada, no un componente definitivo.
- No existe aún integración con la Opening Scene ni con la reserva estructural.
- La animación es ambiental y no reemplaza la futura dirección del componente.

## Prototipo visual 0.4

### Objetivo

Refinar geométricamente la hélice para que se perciba como una doble hélice más ancha, más continua y más científica, manteniendo el carácter premium del concepto.

### Cambios aplicados

- Se incrementó la separación horizontal entre cadenas para que la hélice se perciba más ancha.
- Se sustituyó la geometría fragmentada por dos cadenas continuas y reconocibles.
- Se redibujaron las curvas para mostrar aproximadamente 2,5 vueltas visibles.
- Se redujo la sensación de cuatro cadenas independientes mediante profundidad por orden de capas, opacidad y grosor.
- Se definieron 12 conexiones internas con alternancia entre pares cercanos y lejanos.
- Se extendieron las cadenas fuera del encuadre superior e inferior para sugerir continuidad.
- Se redujo el grosor general para evitar una apariencia de tubo o neón.

### Decisiones provisionales

- La inclinación sigue siendo de 8 grados y se controla desde CSS.
- La anchura local aún puede ajustarse tras la revisión humana.
- El recorte lateral sigue siendo provisional.
- El equilibrio de opacidad deberá evaluarse sobre el fondo real de la Opening Scene.
- La forma exacta de los cruces internos puede evolucionar tras revisión visual.

### Aspectos que deben evaluarse

- claridad de las dos cadenas principales;
- reconocimiento inmediato de la hélice;
- continuidad visual entre segmentos;
- equilibrio entre profundidad y sutileza;
- estabilidad del recorte en escritorio y móvil.

## Integración inicial 0.5

### Objetivo

Llevar la geometría refinada del laboratorio visual a la página principal sin añadir todavía scroll narrativo, nodos interactivos ni conexiones con secciones profesionales completas.

### Cambios aplicados

- Se promovió el SVG refinado a `assets/svg/dna-strand.svg`.
- Se integró el ADN en la Opening Scene como elemento decorativo con `aria-hidden="true"`.
- Se transformó la portada en una composición asimétrica con bloque editorial a la izquierda y ADN a la derecha.
- Se añadió recorte lateral controlado en escritorio para sugerir continuidad fuera del viewport.
- Se definió una adaptación responsive inicial donde el ADN baja de protagonismo para proteger la lectura.
- Se creó una primera estructura de página principal con secciones de identidad profesional, áreas de enfoque y siguiente paso.

### Decisiones provisionales

- El contenido de las secciones posteriores es editorial y deberá sustituirse por información profesional real.
- La navegación es mínima y sirve como estructura inicial, no como sistema final.
- El ADN sigue siendo decorativo en esta fase.
- El comportamiento durante scroll queda pendiente.

## Arquitectura SVG inicial 0.6

### Objetivo

Replantear el ADN como una estructura SVG semántica y evolutiva, no como una imagen decorativa. La prioridad de esta fase es preparar el componente para animación, scroll, nodos activos y ramas futuras sin añadir todavía efectos complejos.

### Cambios aplicados

- Se sustituyó el uso de `<img>` por SVG inline dentro de la Opening Scene.
- Se creó una estructura por grupos: cadenas, peldaños internos, nodos y ramas.
- Se añadieron clases específicas para controlar cada parte desde CSS y JavaScript Vanilla.
- Se añadieron nodos discretos con `data-section` para representar futuras secciones del portfolio.
- Se dejaron ramas de conexión preparadas como paths independientes, inicialmente sin protagonismo visual.
- Se movieron los colores del componente a variables CSS.
- Se mantuvo `aria-hidden="true"` porque el ADN sigue siendo decorativo en esta fase.

### Estructura prevista

- `.dna-component__strand`: curvas laterales de la doble hélice.
- `.dna-component__base-pair`: peldaños internos.
- `.dna-component__base-pair--section`: peldaños principales asociados a secciones.
- `.dna-component__branch`: conexiones futuras hacia contenido.

### Decisiones provisionales

- Los nodos todavía no son interactivos.
- Las ramas existen como arquitectura, pero no se revelan narrativamente todavía.
- La activación por scroll queda pendiente para una fase posterior.
- El componente debe seguir siendo sobrio antes de añadir luz o respuesta al usuario.

## Interacción inicial 0.7

### Objetivo

Hacer que el ADN empiece a comportarse como guía narrativa sin añadir todavía efectos complejos. La interacción debe ser visible, sobria y útil: los nodos principales pueden navegar a secciones y el scroll activa el punto correspondiente.

### Cambios aplicados

- Se convirtieron nodos principales en enlaces SVG accesibles hacia secciones reales.
- Se añadió navegación suave desde los nodos a `profile`, `focus` y `contact`.
- Se añadió activación visual del nodo y la rama correspondiente.
- Se añadió observación de secciones con `IntersectionObserver` para actualizar el nodo activo durante el scroll.
- Se añadió una respuesta muy sutil al movimiento del puntero en escritorio.
- Se retrasó el cambio a composición móvil para mantener el ADN lateral en más tamaños de pantalla.

### Decisiones provisionales

- Solo los nodos que apuntan a secciones existentes son interactivos.
- Los nodos de formación, experiencia, habilidades e idiomas quedan visibles como arquitectura futura.
- Las ramas se muestran con baja intensidad y solo ganan presencia al activar una sección.
- La interacción todavía no representa progreso completo de página; eso queda para una fase posterior.

## Secuenciación por scroll 0.8

### Objetivo

Sustituir la idea de ADN estático con nodos clicables por una metáfora de lectura y síntesis progresiva. La hélice no aparece completa desde el primer momento: se dibuja conforme el visitante baja por la página, como si el portfolio se estuviera secuenciando base a base.

### Cambios aplicados

- Se retiró la navegación por click desde los nodos del ADN.
- Se añadió dibujo progresivo mediante `stroke-dasharray` y `stroke-dashoffset`.
- Cada cadena, peldaño y rama tiene atributos `data-dna-start` y `data-dna-end` para controlar cuándo aparece.
- Los nodos aparecen según el progreso general de scroll.
- Las ramas se dibujan cuando corresponde a su tramo narrativo.
- El ADN pasa a funcionar como guía lateral fija, no como icono dentro del flujo de la portada.
- Las secciones se activan visualmente cuando su tramo de ADN está en lectura.
- Se mantuvo la respuesta sutil al puntero, pero la interacción principal ahora es el scroll.

### Decisiones provisionales

- La secuenciación usa el progreso total de página como primera aproximación.
- Las futuras secciones reales deberán tener nodos propios en la hélice.
- La molécula aún no se desenrolla geométricamente; primero se implementó el crecimiento/dibujo progresivo.
- La siguiente fase debería conectar ramas y títulos de forma más explícita.

## Secuenciación lateral 0.9

### Objetivo

Alinear mejor la metáfora aprobada: el ADN vive en un lateral como columna de lectura, crece al hacer scroll y despliega peldaños/bases hacia el contenido cuando una sección corresponde a ese tramo de la molécula.

### Cambios aplicados

- Se reforzó la posición lateral del ADN reservando espacio visual en escritorio.
- Las ramas del SVG ahora se despliegan hacia la izquierda, en dirección al contenido.
- Las secciones reservan espacio para que el ADN no se sienta superpuesto.
- Se añadió una línea editorial sutil en la sección activa para reforzar la idea de conexión desde la molécula.
- En móvil se elimina la reserva lateral para proteger la lectura.

### Decisiones provisionales

- La conexión entre rama SVG y título todavía es visualmente aproximada, no una unión geométrica exacta.
- El siguiente paso será alinear cada rama con una sección real y hacer que título/contenido aparezcan en cascada desde esa rama.

## Vitalidad visual inicial 1.0

### Objetivo

Elevar el ADN de estructura funcional a pieza visual más memorable sin convertirlo en un efecto exagerado. La molécula debe sentirse viva: respirar, pulsar levemente y sugerir lectura biológica mientras se forma con el scroll.

### Cambios aplicados

- Se añadió una capa de aura detrás de las dos cadenas principales.
- Se añadió un punto lector que recorre la cadena principal según el progreso de scroll.
- Se aplicó una respiración lenta a la estructura SVG.
- Se añadió una micro-rotación ambiental al contenedor lateral.
- Se refinó el grosor de cadenas y peldaños para aumentar presencia visual.
- Se añadieron nodos con gradiente radial para dar más profundidad sin estilo neón.

### Decisiones provisionales

- La vida del ADN debe seguir siendo sutil y científica.
- El punto lector representa la idea de secuenciación, no un cursor interactivo.
- La siguiente fase debería mejorar la alineación exacta entre ramas desplegadas y contenido real.

## Cinta molecular con volumen 1.1

### Objetivo

Acercar el ADN a una presencia más visual y memorable, inspirada en referencias de ilustración científica donde las cadenas no son líneas simples sino cintas con cuerpo, sombra, borde y brillo.

### Cambios aplicados

- Se añadieron sombras estructurales detrás de cada cadena.
- Se aumentó el grosor de las cadenas principales para que funcionen como cintas.
- Se añadieron líneas de brillo sobre cada cadena para simular volumen.
- Se reforzó la profundidad sin usar imágenes, canvas ni librerías externas.
- Se aumentó la presencia de los peldaños para que se integren mejor con las cadenas.

### Decisiones provisionales

- El ADN sigue siendo vectorial, no una ilustración bitmap.
- El estilo busca una interpretación premium oscura, no un boceto literal.
- La próxima fase debería mejorar el cruce delante/detrás de las cintas para aumentar realismo biológico.

## Cruces con profundidad 1.2

### Objetivo

Resolver el principal punto visual pendiente de la versión ribbon: que las cintas no parezcan dos trazos continuos en el mismo plano, sino una doble hélice con tramos que pasan por delante y por detrás.

### Cambios aplicados

- Se añadieron tramos frontales independientes sobre las cadenas continuas.
- Cada tramo frontal tiene sombra, cinta y brillo propios.
- Se alternó qué cadena gana presencia en distintos segmentos de la hélice.
- Los tramos frontales también participan en el dibujo progresivo por scroll.
- Se mantuvo la estructura SVG editable sin imágenes, canvas ni librerías.

### Decisiones provisionales

- La profundidad sigue siendo una simulación por capas SVG.
- Algunas sombras de cruce pueden necesitar ajuste fino tras revisión en navegador real.
- La siguiente fase debería redibujar la geometría completa de la hélice con segmentos nativos, no solo overlays, si se busca un realismo mayor.

## Primer boceto narrativo completo 1.3

### Objetivo

Convertir la página principal en una primera experiencia completa, no solo en una portada con ADN. El objetivo de esta versión es que la molécula funcione como columna vertebral visual: crece con el scroll, ilumina nodos reales, despliega ramas y marca una secuencia profesional inicial.

### Cambios aplicados

- Se reorganizó la página en cinco secciones narrativas: Identity, Knowledge, Research, Application y Life.
- Se sustituyeron nodos antiguos o futuros por nodos reales asociados a `profile`, `knowledge`, `research`, `application` y `contact`.
- Se añadieron ramas SVG para cada sección, orientadas hacia el contenido.
- Se incorporaron puntos discretos en los extremos de los peldaños para reforzar la lectura de bases internas.
- El JavaScript ahora observa cualquier sección con `data-sequence-section`, evitando listas rígidas de ids antiguos.
- El contenido de cada sección gana presencia en cascada cuando su nodo/ramal está activo.
- La navegación superior se alineó con la nueva secuencia narrativa.
- Se conservó el ADN como SVG, sin imágenes, canvas ni librerías externas.

### Decisiones provisionales

- La geometría del ADN ya tiene mayor presencia, pero todavía puede refinarse para parecer más ilustración científica y menos diagrama técnico.
- Las ramas sugieren la conexión con el contenido; la unión geométrica exacta entre rama y título queda para una fase posterior.
- El contenido editorial es de estructura y deberá sustituirse por datos reales del CV.
- El comportamiento móvil mantiene el ADN más ambiental para proteger la lectura.

## Bases de sección ensamblables 1.4

### Objetivo

Corregir la lectura visual de la secuencia: las secciones no deben estar marcadas por puntos sobre el ADN. Cada sección debe aportar una base que espera en el contenido y, al activarse con el scroll, se une al ADN para formar un peldaño.

### Cambios aplicados

- Se eliminaron los puntos de base y el lector circular.
- Se sustituyeron los nodos visuales por peldaños de sección (`data-dna-base`).
- Se dejó la doble hélice completa como estructura fuerte y visible.
- Los peldaños principales se dibujan mediante `stroke-dasharray` solo cuando corresponde a su tramo de scroll.
- Cada sección incluye una `sequence-base` que funciona como base en espera y se desplaza/extiende hacia el ADN cuando la sección se activa.
- Las ramas se mantienen como conexiones sobrias entre base, contenido y molécula.

### Decisiones provisionales

- La unión geométrica exacta entre la base que espera en la sección y el peldaño dentro del SVG todavía es aproximada.
- El ADN ya no depende de puntos ni nodos circulares para indicar progreso.
- La siguiente fase puede afinar la coincidencia geométrica exacta entre la base desplazada y el peldaño que aparece dentro de la hélice.

## ADN sintetizado por scroll 1.5

### Objetivo

Evitar que el ADN aparezca completo desde la portada. La molécula debe construirse durante el recorrido, conservando presencia visual pero respetando la metáfora de síntesis.

### Cambios aplicados

- Todas las capas principales de la molécula pasaron a usar `data-dna-draw`.
- Las dos cadenas laterales, sombras, brillos, cintas frontales, peldaños secundarios, bases de sección y ramas ahora se dibujan por progreso de scroll.
- El primer tramo de ADN no aparece en el estado inicial de la portada.
- Las bases de sección siguen esperando en el contenido y se ensamblan al llegar a su tramo.

### Decisiones provisionales

- El inicio del dibujo está situado después del primer estado de portada para evitar que se vea una parte suelta arriba.
- El ritmo de síntesis todavía puede ajustarse cuando se revise en navegador real.

## ADN ilustrado tipo cinta 1.6

### Objetivo

Redibujar la molécula para acercarla a la referencia visual aprobada: un ADN más fuerte, con presencia anatómica, lectura de cinta y peldaños internos más claros.

### Cambios aplicados

- Redibujadas las dos cadenas principales con una silueta más vertical y reconocible.
- Cambiada la paleta del ADN hacia blanco clínico, azul científico y grises suaves.
- Aumentado el grosor de las cintas, sombras y brillos internos para crear una lectura más ilustrada.
- Sincronizado `assets/svg/dna-strand.svg` con el SVG inline de la página principal.
- Eliminados restos visuales del lenguaje anterior de puntos/nodos.
- Reposicionado el ADN lateral para que tenga más presencia sin invadir el contenido editorial.
- Reducida la atmósfera morada del fondo para mantener un tono más científico y premium.

### Decisiones provisionales

- La molécula ya tiene más cuerpo visual, pero aún puede refinarse con pequeños detalles de sombreado o textura si el diseño necesita acercarse más al estilo de boceto científico.
- La prioridad sigue siendo conservar SVG limpio, animable por capas y compatible con el sistema de síntesis por scroll.

## ADN esculpido por piezas 1.7

### Objetivo

Abandonar el enfoque de líneas gruesas y redibujar el ADN en un formato completamente diferente: una composición por piezas rellenas, como una ilustración vectorial esculpida.

### Cambios aplicados

- Sustituidas las cadenas basadas en `stroke` por segmentos SVG cerrados con `fill`.
- Añadidas cintas separadas en capas traseras y frontales para reforzar la lectura de profundidad.
- Convertidos los peldaños en piezas independientes con sombra, placa y brillo central.
- Añadido soporte JavaScript para `data-dna-piece`, de forma que las piezas rellenas también puedan sintetizarse con el scroll.
- Conservadas las ramas con `data-dna-draw` para mantener conexiones hacia las secciones.
- Sincronizado de nuevo el SVG inline con `assets/svg/dna-strand.svg`.

### Decisiones provisionales

- Esta versión prioriza cambiar el lenguaje visual por completo antes que pulir detalles finos.
- La animación de las cintas ahora ocurre por aparición/ensamblaje de piezas, no por dibujo de línea.
- Si el concepto visual funciona, la siguiente iteración puede afinar proporciones, cruces y sombreado.

## ADN en blanco para reinvención 1.8

### Objetivo

Retirar el ADN actual por completo para evitar seguir iterando sobre una base visual que no funciona. La página queda limpia y lista para programar una nueva solución desde cero.

### Cambios aplicados

- Eliminado el SVG inline del ADN en la página principal.
- Eliminadas las bases visuales de sección.
- Eliminados estilos de cintas, peldaños, ramas y piezas del ADN.
- Eliminada la lógica JavaScript específica de `data-dna-*`.
- Reemplazado `assets/svg/dna-strand.svg` por un SVG vacío con un slot semántico.
- Conservado `.opening-dna` como contenedor invisible para futura implementación.

### Decisiones provisionales

- No habrá ADN visible hasta definir una nueva dirección.
- La siguiente fase debe partir de arquitectura y exploración visual, no de correcciones del boceto anterior.

## Historial del documento

### 0.2 — Especificación visual de la Opening Scene

- Definida la composición asimétrica.
- Establecidos rangos iniciales de escala y recorte.
- Definida la orientación vertical.
- Definido el número aproximado de vueltas.
- Añadidas reglas responsive conceptuales.
- Añadida un área segura para la composición editorial.

### 0.3 — Primer prototipo visual aislado

- Creado un laboratorio visual independiente.
- Construida una primera doble hélice en SVG.
- Aplicado el sistema de color azul-morado.
- Añadida profundidad simulada.
- Añadido movimiento ambiental básico.
- Añadido soporte para reduced motion.
- Registradas decisiones provisionales del prototipo.

### 0.4 — Refinamiento geométrico del prototipo

- Reestructurada la geometría del ADN para una mayor anchura visual.
- Ajustada la forma de las cadenas para reforzar el reconocimiento de 2,5 vueltas.
- Mejorada la segmentación por profundidad.
- Aumentado el número de conexiones internas.
- Conservada la inclinación provisional de 8 grados.

### 0.5 — Integración inicial en la página principal

- Promovido el SVG refinado a `assets/svg`.
- Integrado el ADN en la Opening Scene real.
- Replanteada la portada como composición asimétrica.
- Añadidas secciones iniciales para convertir la portada en página principal.

### 0.6 — Arquitectura SVG semántica

- Sustituido el ADN como imagen por SVG inline.
- Separadas cadenas, peldaños, nodos y ramas mediante clases.
- Añadidos nodos preparados para futuras secciones narrativas.
- Movido el control visual principal a variables CSS.

### 0.7 — Interacción inicial de nodos

- Convertidos nodos principales en enlaces internos.
- Añadida activación visual por hover, foco, click y scroll.
- Añadida respuesta sutil al puntero.
- Ajustado el breakpoint para conservar composición lateral en tablet/escritorio estrecho.

### 0.8 — Secuenciación progresiva

- Eliminado el modelo de nodos clicables.
- Implementado crecimiento del ADN con el scroll.
- Añadidos rangos de aparición para cadenas, peldaños, nodos y ramas.
- Convertido el ADN en guía lateral persistente.

### 0.9 — ADN como columna lateral

- Orientadas las ramas/peldaños hacia el contenido.
- Reservado espacio lateral para la molécula en escritorio.
- Añadida respuesta visual de sección activa.

### 1.0 — Vitalidad visual inicial

- Añadida aura sutil a las cadenas.
- Añadido punto lector que avanza por la molécula con el scroll.
- Añadida respiración y micro-rotación ambiental.
- Refinados nodos, grosores y profundidad visual.

### 1.1 — Cinta molecular con volumen

- Añadidas capas de sombra bajo las cadenas.
- Aumentado el grosor de las cadenas para crear efecto ribbon.
- Añadidas líneas de brillo para reforzar volumen.
- Reforzada la presencia visual de peldaños internos.

### 1.2 — Cruces delante/detrás

- Añadidos tramos frontales superpuestos.
- Simulada alternancia de profundidad en la doble hélice.
- Conservado el crecimiento por scroll en las nuevas capas.

### 1.3 — Primer boceto narrativo completo

- Construida una página principal inicial con cinco tramos de secuenciación.
- Alineados nodos, ramas y secciones reales.
- Añadidos puntos de base para enriquecer la lectura biológica.
- Activado contenido en cascada desde la sección actual.
- Actualizado el seguimiento por scroll para usar `data-sequence-section`.

### 1.4 — Bases de sección ensamblables

- Eliminados puntos, nodos circulares y lector circular.
- Redibujada la hélice para tener más presencia y continuidad.
- Convertidos cinco peldaños principales en bases asociadas a secciones.
- Añadida una base visual en espera dentro de cada sección, con desplazamiento hacia la hélice al activarse.
- Mantenida la construcción por scroll sin que la portada muestre solo un fragmento suelto.

### 1.5 — ADN sintetizado por scroll

- Evitado que la molécula completa aparezca desde la portada.
- Convertidas cadenas, sombras, brillos y cintas frontales en trazos dibujables por scroll.
- Añadidos rangos de dibujo a peldaños secundarios y capas estructurales.
- Conservada la idea de bases de sección que se ensamblan como peldaños.

### 1.6 — ADN ilustrado tipo cinta

- Redibujada la geometría principal para lograr un ADN más fuerte y reconocible.
- Reemplazado el lenguaje azul-morado por una cinta blanca/azul de carácter más científico.
- Aumentados grosores, sombras y brillos para acercar el componente a una ilustración premium.
- Sincronizado el SVG reusable con el SVG inline.

### 1.7 — ADN esculpido por piezas

- Cambiado el formato visual del ADN desde trazos a piezas SVG rellenas.
- Añadidos segmentos frontales y traseros para crear una lectura más ilustrada.
- Incorporada animación por `data-dna-piece` en JavaScript.
- Conservada la síntesis por scroll y las bases de sección.

### 1.8 — ADN en blanco para reinvención

- Retirado el ADN visual de la página principal.
- Eliminadas bases de sección, ramas, piezas SVG y lógica `data-dna-*`.
- Dejado un slot invisible para programar la próxima versión desde cero.
