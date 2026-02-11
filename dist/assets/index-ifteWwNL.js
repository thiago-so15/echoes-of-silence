(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const $={miedo:0,cordura:100,paranoia:0,culpa:0,trauma:0,vio_reflejo:0,contesto_telefono:0,abrio_caja:0,conoce_sotano:0,vio_fotos:0,leyo_nota:0,nombre_susurrado:0},ne={inicio:{id:"inicio",getText:e=>`Abres los ojos.

El techo está ahí. Blanco. Familiar. Pero algo ha cambiado. No sabes qué. No sabes cuándo.

Solo sabes que el silencio que llena la habitación no es el silencio normal de las tres de la madrugada.

Este silencio tiene peso.

${e.paranoia>0?"Este silencio te observa.":"Este silencio... espera."}`,choices:[{text:"Levantarse lentamente",nextScene:"habitacion",effects:{miedo:5}},{text:"Quedarse inmóvil. Escuchar.",nextScene:"escuchar",effects:{paranoia:10}}]},escuchar:{id:"escuchar",getText:e=>`Te quedas quieto. Completamente quieto.

El silencio se espesa. Se vuelve algo casi físico, como una manta húmeda sobre tu pecho. Escuchas tu propia respiración. El latido de tu corazón. El zumbido eléctrico de algo que no logras identificar.

Y debajo de todo eso... algo más.

Un sonido que no debería estar ahí. Tan bajo que podrías estar imaginándolo.`,choices:[{text:"Levantarse de golpe",nextScene:"habitacion",effects:{miedo:15}},{text:"Seguir escuchando",nextScene:"susurro",effects:{paranoia:15,cordura:-5}}]},susurro:{id:"susurro",timeLimit:8,timeoutScene:"habitacion_oscura",getText:e=>`Lo escuchas claramente ahora.

Es una voz. No. No es una voz. Es algo que se parece a una voz de la misma manera que una sombra se parece a la persona que la proyecta.

Dice tu nombre.

O eso crees.

Viene de dentro del apartamento.`,choices:[{text:"¡¿Quién está ahí?!",nextScene:"eco",effects:{miedo:10,nombre_susurrado:1}},{text:"No responder. No hacer ruido.",nextScene:"habitacion_oscura",effects:{paranoia:15,nombre_susurrado:1},isTimeoutDefault:!0}]},eco:{id:"eco",getText:e=>`Tu voz rompe el silencio como cristal contra el suelo.

El eco rebota por las paredes. Se distorsiona. Por un instante — solo un instante — juras que el eco no suena exactamente como tu voz.

Suena como si alguien te estuviera imitando.

Desde algún lugar del pasillo.

Luego, nada. El silencio regresa, más denso que antes.`,choices:[{text:"Ir hacia el pasillo",nextScene:"pasillo_oscuro",effects:{miedo:15,trauma:5}}]},habitacion:{id:"habitacion",getText:e=>`Te incorporas en la cama. La habitación está en penumbras — la luz de la calle se filtra apenas por las cortinas, dibujando líneas grises en el suelo.

Todo parece estar en su lugar. La silla. El armario. La puerta entreabierta.

${e.miedo>10?"Pero no puedes evitar la sensación de que algo se ha movido mientras tenías los ojos cerrados.":"El reloj de la mesita marca las 3:33."}

El interruptor de la luz está junto a la puerta.`,choices:[{text:"Encender la luz",nextScene:"habitacion_luz",effects:{}},{text:"Salir al pasillo en la oscuridad",nextScene:"pasillo_oscuro",effects:{miedo:10,paranoia:5}}]},habitacion_oscura:{id:"habitacion_oscura",getText:e=>`Te levantas en silencio. La oscuridad es casi total — solo la línea de luz bajo la puerta del pasillo te indica dónde estás.

${e.nombre_susurrado?"El susurro se ha detenido. O quizá simplemente se ha vuelto parte del silencio.":"La quietud es absoluta."}

El aire está extrañamente frío.`,choices:[{text:"Buscar el interruptor",nextScene:"habitacion_luz",effects:{miedo:5}},{text:"Salir sin encender la luz",nextScene:"pasillo_oscuro",effects:{paranoia:10}}]},habitacion_luz:{id:"habitacion_luz",getText:e=>`La luz parpadea dos veces antes de encenderse del todo. La habitación se revela: tu habitación. Normal. Conocida.

Excepto por un detalle.

La silla que suele estar frente al escritorio está ahora junto a la cama. Mirando hacia donde dormías.

${e.paranoia>20?"Estás seguro de que no la moviste.":"No recuerdas haberla movido. Probablemente lo hiciste antes de dormir."}`,choices:[{text:"Ir al pasillo",nextScene:"pasillo",effects:{miedo:5}},{text:"Revisar la habitación con cuidado",nextScene:"detalle_habitacion",effects:{paranoia:5}}]},detalle_habitacion:{id:"detalle_habitacion",getText:e=>`Revisas la habitación. El armario está cerrado. Dentro, tu ropa, nada fuera de lugar. Los cajones del escritorio: papeles, un bolígrafo, un cuaderno.

Abres el cuaderno. Las últimas páginas tienen anotaciones en tu letra, pero no las recuerdas:

"No duermas."
"No es real."
"La puerta no lleva a ningún sitio."

La última línea está escrita con tanta presión que casi atraviesa el papel:

"NO CONFÍES EN EL SILENCIO."`,choices:[{text:"Ir al pasillo",nextScene:"pasillo",effects:{miedo:15,paranoia:10,leyo_nota:1}}]},pasillo_oscuro:{id:"pasillo_oscuro",getText:e=>`El pasillo está oscuro. Más oscuro de lo que debería. La luz que solía filtrarse por la ventana del fondo no está ahí.

Tus pies descalzos tocan el suelo frío. Cada paso suena demasiado fuerte en este silencio.

${e.paranoia>15?"Tienes la certeza irracional de que algo te observa desde el fondo del pasillo.":"A tu izquierda, la cocina. Al fondo, el salón."}

Huele a algo que no logras identificar. Algo viejo.`,choices:[{text:"Avanzar hacia la cocina",nextScene:"cocina",effects:{miedo:5}},{text:"Volver a la habitación",nextScene:"habitacion",effects:{miedo:10,cordura:-5}}]},pasillo:{id:"pasillo",getText:e=>`El pasillo de tu apartamento. Tres puertas: el baño a la derecha, la cocina al frente, el salón a la izquierda.

La luz del pasillo funciona, pero parpadea con un ritmo irregular que te pone nervioso.

${e.miedo>20?"Cada parpadeo te hace imaginar que las sombras se mueven.":"Al fondo, la puerta principal. Cerrada."}`,choices:[{text:"Ir a la cocina",nextScene:"cocina",effects:{}},{text:"Ir al baño",nextScene:"bano",effects:{}},{text:"Ir al salón",nextScene:"salon_vacio",effects:{}}]},cocina:{id:"cocina",getText:e=>`La cocina. El grifo gotea con un ritmo lento y constante. Cada gota resuena en el silencio.

Sobre la mesa hay una hoja de papel. Tu letra. Tinta negra, trazo irregular, como si la hubieras escrito con prisa. O con miedo.

El reloj del microondas marca las 3:33.

El mismo que el reloj de la habitación.`,choices:[{text:"Leer la nota",nextScene:"nota",effects:{leyo_nota:1}}]},nota:{id:"nota",timeLimit:20,timerHidden:!0,timeoutScene:"telefono_suena",getText:e=>`La nota dice:

"Si estás leyendo esto, ya ha empezado. No abras la puerta principal. No importa lo que escuches. No importa quién llame.

Lo que hay fuera no es real. O lo que hay dentro no es real. Ya no estoy seguro.

No confíes en el silencio. El silencio es donde se esconde."

${e.paranoia>25?"La letra se vuelve más errática al final, como si hubieras escrito con la mano temblando.":"Reconoces tu letra, pero no recuerdas haber escrito esto."}

La nota no tiene fecha.`,choices:[{text:"Explorar el apartamento",nextScene:"explorar",effects:{miedo:10}},{text:"Ir directamente a la puerta principal",nextScene:"puerta_entrada",effects:{miedo:5,trauma:5}},{text:"Examinar la nota con más detalle",nextScene:"nota_detalle",effects:{paranoia:10}}]},nota_detalle:{id:"nota_detalle",getText:e=>`Das vuelta a la nota. En el reverso hay algo más. Un dibujo hecho a bolígrafo: una puerta. Detrás de la puerta, oscuridad representada con trazos violentos y repetitivos.

Y en la esquina inferior, apenas legible:

"El sótano. La caja. No la abras tampoco."

No sabías que tu apartamento tuviera sótano.`,choices:[{text:"Explorar el apartamento",nextScene:"explorar",effects:{miedo:15,conoce_sotano:1}},{text:"Ir a la puerta principal",nextScene:"puerta_entrada",effects:{miedo:10,trauma:5}}]},explorar:{id:"explorar",getText:e=>{let a=`El apartamento se siente más pequeño de lo que recuerdas. O quizá eres tú el que se siente más grande. O más atrapado.

Las paredes parecen absorber la luz. Cada rincón guarda una sombra que no debería estar ahí.`;return e.conoce_sotano&&(a+=`

Recuerdas las palabras de la nota: "El sótano." Ahora notas una puerta al fondo del pasillo que no habías visto antes. O que habías decidido no ver.`),a},choices:[{text:"Ir al baño",nextScene:"bano",effects:{}},{text:"Ir al salón",nextScene:"salon",effects:{}},{text:"Ir a la puerta del fondo",nextScene:"puerta_fondo",condition:e=>e.conoce_sotano>0,effects:{miedo:10}},{text:"Ir a la puerta principal",nextScene:"puerta_entrada",effects:{miedo:5}}]},bano:{id:"bano",getText:e=>`El baño. Azulejos blancos que reflejan la luz de forma enfermiza. El espejo sobre el lavabo.

Tu reflejo te devuelve la mirada.

${e.paranoia>20?"O algo que se parece mucho a tu reflejo.":"Tienes ojeras. Profundas. Como si no hubieras dormido en días."}

El espejo está ligeramente empañado, aunque no hay vapor.`,choices:[{text:"Mirarte fijamente en el espejo",nextScene:"espejo",effects:{paranoia:5}},{text:"Salir del baño",nextScene:"explorar",effects:{}}]},espejo:{id:"espejo",timeLimit:6,timeoutScene:"reflejo",getText:e=>`Te acercas al espejo. Tu reflejo te imita, como debe ser.

Pero mientras miras... algo cambia. Es sutil. Casi imperceptible. ¿Tu reflejo parpadeó un instante después que tú? ¿Sus labios se movieron ligeramente?

Sientes que si sigues mirando, vas a ver algo que no quieres ver.

La presión en tu pecho aumenta.`,choices:[{text:"Seguir mirando",nextScene:"reflejo",effects:{cordura:-15,vio_reflejo:1,paranoia:15},isTimeoutDefault:!0},{text:"Apartarse del espejo",nextScene:"salon",effects:{miedo:10}}]},reflejo:{id:"reflejo",getText:e=>e.cordura<70?`Tu reflejo sonríe.

No es tu sonrisa. Es algo más amplio, más lento, como si los músculos de esa cara no supieran exactamente cómo funciona una sonrisa humana.

Retrocedes de golpe. Cuando vuelves a mirar, el espejo muestra tu cara normal. Asustada. Pálida.

Pero durante un segundo — un segundo que se graba en tu memoria como hierro candente — lo que había en ese espejo no eras tú.`:`Miras fijamente. Tu reflejo te sostiene la mirada con una intensidad que no sientes en ti mismo.

Luego — tan rápido que podrías haberlo imaginado — tu reflejo ladea la cabeza. Una fracción de segundo antes que tú.

Cierras los ojos. Cuando los abres, todo es normal.

Pero la sensación de ser observado no se va.`,choices:[{text:"Salir del baño inmediatamente",nextScene:"salon",effects:{miedo:20,trauma:10}}]},salon_vacio:{id:"salon_vacio",getText:e=>`El salón. Sofá, mesa baja, televisor apagado. Las cortinas están cerradas.

Todo parece normal. Demasiado normal. Como una escenografía de teatro — correcto en la superficie, pero vacío por dentro.

${e.paranoia>15?"El aire huele a algo dulce y desagradable, como flores marchitas.":"Un silencio pesado ocupa la habitación."}`,choices:[{text:"Examinar el salón",nextScene:"salon",effects:{}},{text:"Volver al pasillo",nextScene:"pasillo",effects:{}}]},salon:{id:"salon",getText:e=>{let a=`El salón. La luz de una farola se filtra por las cortinas, creando sombras alargadas que se extienden por el suelo como dedos.

`;return e.vio_reflejo&&(a+=`Después de lo del espejo, cada sombra parece tener intención. Cada rincón oscuro podría contener algo.

`),a+="Sobre la estantería hay fotografías enmarcadas. El televisor está apagado, pero su pantalla negra refleja la habitación de forma distorsionada.",a},choices:[{text:"Examinar las fotografías",nextScene:"fotos",effects:{paranoia:5}},{text:"Encender el televisor",nextScene:"television",effects:{miedo:5}},{text:"Volver",nextScene:"explorar",effects:{}}]},fotos:{id:"fotos",getText:e=>`Las fotografías muestran momentos que reconoces vagamente. Cumpleaños. Reuniones. Rostros de personas que deberías recordar pero que se sienten como sueños de otra persona.

En una de las fotos apareces tú. Estás sonriendo. Pero hay algo en tus ojos — en los ojos de la fotografía — que no encaja. Una expresión que no es alegría.

${e.paranoia>30?`Miras más de cerca. En el fondo de la foto, parcialmente oculta por una cortina, hay una silueta. Alguien que no debería estar ahí.

Alguien que te está mirando.`:"En la última foto, estás solo. De pie frente a una puerta que no reconoces."}

Una de las fotos está boca abajo.`,choices:[{text:"Dar vuelta a la foto",nextScene:"foto_reverso",effects:{miedo:10,vio_fotos:1,trauma:5}},{text:"Dejar las fotos",nextScene:"telefono_suena",effects:{vio_fotos:1}}]},foto_reverso:{id:"foto_reverso",getText:e=>`Das vuelta a la fotografía.

Es una foto de esta habitación. Este salón. Tomada desde el ángulo exacto donde estás parado ahora.

Pero en la foto, hay alguien sentado en el sofá. Una figura borrosa, como si se hubiera movido durante la exposición. O como si no fuera del todo... sólida.

En el reverso de la foto, con tu letra:

"Siempre ha estado aquí."`,choices:[{text:"Mirar el sofá",nextScene:"sofa_vacio",effects:{miedo:20,cordura:-10,paranoia:15}}]},sofa_vacio:{id:"sofa_vacio",getText:e=>`Miras el sofá. Está vacío.

Por supuesto que está vacío.

${e.cordura<70?"Pero hay una marca en el cojín. Una depresión. Como si alguien acabara de levantarse.":"Sin embargo, no puedes sacarte la imagen de encima."}

El teléfono empieza a sonar.`,choices:[{text:"Contestar el teléfono",nextScene:"telefono_suena",effects:{}}]},television:{id:"television",getText:e=>`Enciendes el televisor. La pantalla parpadea con estática durante unos segundos.

Luego muestra una imagen. Es tu apartamento. Tu salón. Filmado desde arriba, como una cámara de seguridad.

${e.cordura<75?`En la imagen del televisor, puedes verte a ti mismo mirando el televisor. Pero hay alguien más en la habitación. De pie detrás de ti.

No te atrevas a darte vuelta.`:"La imagen se congela. Estática. Luego el televisor se apaga solo."}

El silencio después es ensordecedor.`,choices:[{text:e=>e.cordura<75?"Darte vuelta lentamente":"Continuar",nextScene:"telefono_suena",effects:{miedo:25,cordura:-10,trauma:10}}]},telefono_suena:{id:"telefono_suena",timeLimit:10,timeoutScene:"silencio_telefono",getText:e=>`El teléfono suena.

Es un sonido antiguo, metálico, que no debería producir un teléfono moderno. Cada timbrazo corta el silencio como un cuchillo.

El identificador de llamadas muestra tu propio número.

${e.paranoia>30?"Algo dentro de ti grita que no contestes.":"La curiosidad y el miedo luchan dentro de ti."}`,choices:[{text:"Contestar",nextScene:"llamada",effects:{contesto_telefono:1,miedo:10}},{text:"Dejar que suene",nextScene:"silencio_telefono",effects:{paranoia:10},isTimeoutDefault:!0}]},llamada:{id:"llamada",getText:e=>e.cordura<65?`Levantas el teléfono.

Al principio, solo estática. Luego, una respiración. Lenta. Deliberada.

Y después, tu propia voz:

"No debiste contestar. Ahora sabe que estás despierto."

La línea se corta. El silencio que sigue es el más profundo que has experimentado en tu vida.

Como si el mundo entero estuviera conteniendo la respiración.`:`Levantas el teléfono.

Estática. Un largo silencio. Luego una voz — distorsionada, irreconocible, pero con un ritmo que te resulta familiar:

"Tienes que salir. La puerta. Sal antes de que olvides por qué necesitas salir."

Antes de que puedas responder, la llamada se corta.

El eco de esas palabras se queda flotando en el aire.`,choices:[{text:"Ir a la puerta principal",nextScene:"puerta_entrada",effects:{miedo:10}},{text:"No. La nota decía que no abriera la puerta.",nextScene:"decision_crucial",effects:{paranoia:10,miedo:5}}]},silencio_telefono:{id:"silencio_telefono",getText:e=>`El teléfono deja de sonar. El silencio que sigue es diferente al de antes. Más espeso. Más intencional.

Como si algo estuviera decepcionado de que no hayas contestado.

${e.paranoia>25?"Juras que escuchas algo. Un suspiro. Desde algún lugar del apartamento.":'La pantalla del teléfono muestra "1 llamada perdida". De tu propio número.'}`,choices:[{text:"Ir a la puerta principal",nextScene:"puerta_entrada",effects:{miedo:5}},{text:"Pensar. ¿Qué está pasando?",nextScene:"decision_crucial",effects:{paranoia:5}}]},puerta_entrada:{id:"puerta_entrada",getText:e=>{let a=`La puerta principal. Madera oscura. Cerrojo echado.

`;return e.leyo_nota&&(a+=`La nota decía que no la abrieras. Que lo de fuera no es real. O lo de dentro.

`),e.contesto_telefono&&(a+=`La voz del teléfono decía que salieras. Que salieras antes de olvidar por qué.

`),a+=`Pones la mano en el pomo. Está frío. Más frío de lo normal.

`,a+=e.miedo>40?"Tu mano tiembla.":"El metal te quema con su frialdad.",a},choices:[{text:"Abrir la puerta",nextScene:"abrir_puerta",effects:{trauma:15,miedo:15}},{text:"No. No voy a abrirla.",nextScene:"decision_crucial",effects:{miedo:5,paranoia:10}}]},abrir_puerta:{id:"abrir_puerta",getText:e=>e.cordura<55?`Giras el pomo. La puerta se abre.

Al otro lado no hay pasillo. No hay edificio. No hay calle.

Hay oscuridad. Una oscuridad absoluta, viva, que respira. Se mueve como humo negro, lamiendo el umbral de la puerta.

Y en el centro de esa oscuridad, algo te mira. No tiene ojos, pero te mira. Lo sientes en cada célula de tu cuerpo.

Sonríe.

Con tu boca.`:`Giras el pomo. La puerta se abre.

Al otro lado... el pasillo del edificio. Normal. Vacío. Las luces fluorescentes parpadean con su zumbido habitual.

Pero algo está mal. El pasillo se extiende más de lo que debería. Las puertas de los vecinos parecen estar más lejos. O quizá son más de las que recuerdas.

Y el silencio aquí es el mismo que dentro. Exactamente el mismo.`,choices:[{text:e=>e.cordura<55?"Cerrar la puerta de golpe":"Avanzar por el pasillo",nextScene:e=>e.cordura<55?"final_puerta":"exterior",effects:{miedo:20,trauma:15}},{text:e=>e.cordura<55?"No puedes moverte":"Cerrar y volver dentro",nextScene:e=>e.cordura<55?"final_puerta":"decision_crucial",effects:{miedo:15,cordura:-10}}]},exterior:{id:"exterior",getText:e=>`Caminas por el pasillo. Tus pasos resuenan de forma extraña, como si el sonido llegara con un ligero retraso.

Las puertas de los apartamentos están todas cerradas. Ninguna tiene número. Ninguna tiene mirilla.

Llegas al ascensor. El indicador marca el piso 3. Tu piso. Siempre el piso 3.

Pulsas el botón. Las puertas se abren inmediatamente, como si te estuviera esperando.

Dentro del ascensor, los botones solo muestran un piso: el 3.`,choices:[{text:"Entrar al ascensor",nextScene:"final_bucle",effects:{trauma:10,cordura:-15}},{text:"Buscar las escaleras",nextScene:"final_ecos",effects:{miedo:10}}]},decision_crucial:{id:"decision_crucial",timeLimit:25,timerHidden:!0,timeoutScene:"figura",getText:e=>{let a=`Estás de pie en el centro de tu apartamento. El silencio pulsa a tu alrededor como un corazón enorme.

`;return e.trauma>20&&(a+=`Has visto demasiado. Cada sombra tiene forma. Cada silencio tiene voz.

`),a+="Tienes que tomar una decisión. No puedes quedarte aquí para siempre en este punto intermedio entre la acción y la parálisis.",e.conoce_sotano&&(a+=`

La puerta del fondo — la que lleva al sótano — parece llamarte en silencio.`),a},choices:[{text:"Abrir la puerta principal",nextScene:"puerta_entrada",effects:{miedo:5}},{text:"Bajar al sótano",nextScene:"puerta_fondo",condition:e=>e.conoce_sotano>0,effects:{miedo:15}},{text:"Quedarse. Esperar.",nextScene:"espera",effects:{paranoia:15,cordura:-5}},{text:"Intentar dormir",nextScene:"intentar_dormir",effects:{cordura:-10}}]},puerta_fondo:{id:"puerta_fondo",timeLimit:5,timeoutScene:"decision_crucial_2",getText:e=>`La puerta del fondo del pasillo. No tiene picaporte visible. Es de un color oscuro que parece absorber la luz.

Cuando pones la mano sobre ella, sientes vibración. Como si algo del otro lado estuviera en movimiento.

La puerta cede con un empujón. Detrás, escaleras que descienden hacia una oscuridad total.

Un aire frío y húmedo sube desde abajo, trayendo un olor a tierra y a algo más. Algo orgánico.`,choices:[{text:"Descender",nextScene:"sotano",effects:{miedo:20,trauma:10}},{text:"Cerrar la puerta. No.",nextScene:"decision_crucial_2",effects:{miedo:10},isTimeoutDefault:!0}]},sotano:{id:"sotano",getText:e=>`Bajas las escaleras. Cada peldaño cruje bajo tu peso. La oscuridad te envuelve como agua fría.

Llegas a un espacio amplio. El suelo es de tierra. El techo es bajo — puedes sentirlo aunque no lo veas.

Tu mano encuentra una pared húmeda. Sigues la pared hasta que tus dedos tropiezan con algo: un interruptor.

La luz se enciende: un bombillo desnudo que proyecta sombras duras.

El sótano está vacío. Completamente vacío.

Excepto por una caja de madera en el centro.`,choices:[{text:"Abrir la caja",nextScene:"caja",effects:{miedo:15,trauma:10,abrio_caja:1}},{text:"Subir. No quieres saber.",nextScene:"decision_crucial_2",effects:{miedo:10,cordura:-5}}]},caja:{id:"caja",getText:e=>`Abres la caja.

Dentro hay objetos. Tus objetos. Tu reloj — el que pensabas que habías perdido. Una entrada de cine de hace meses. Tu cartera con tus documentos. Las llaves de este apartamento.

Y al fondo, un cuaderno. Diferente al de arriba. Más gastado. Más grueso.

Lo abres.

Páginas y páginas con la misma frase, repetida cientos de veces:

"No es la primera vez."

En las últimas páginas, la frase cambia:

"No es la primera vez. Nunca es la primera vez. Cada vez que despiertas, olvidas. Cada vez que olvidas, vuelves a empezar."

${e.vio_reflejo?"Y debajo, un dibujo de un rostro. Tu rostro. Sonriendo de la misma manera que tu reflejo en el espejo.":"Y debajo, una flecha señalando hacia arriba. Hacia el apartamento."}`,choices:[{text:"Subir con el cuaderno",nextScene:"confrontacion",effects:{cordura:-20,trauma:15,culpa:20}}]},espera:{id:"espera",getText:e=>`Decides esperar. Te sientas en el suelo del pasillo, con la espalda contra la pared.

Pasan los minutos. O las horas. El tiempo se vuelve algo elástico e irrelevante.

${e.paranoia>40?"Las sombras se alargan. Se mueven. Estás seguro de que se mueven, aunque la luz no cambia.":"El silencio se profundiza hasta que puedes escuchar el sonido de tu propia sangre circulando."}

Y entonces lo ves.

Al fondo del pasillo. Donde antes no había nada.

Una figura.`,choices:[{text:"Enfrentarla",nextScene:"figura",effects:{miedo:20}}]},intentar_dormir:{id:"intentar_dormir",getText:e=>`Vuelves a la cama. Cierras los ojos.

Pero el sueño no viene. En su lugar, viene otra cosa. Imágenes detrás de tus párpados: la silla mirándote, la nota, el reloj marcando 3:33, siempre 3:33.

${e.vio_reflejo?"Y esa sonrisa. La sonrisa del espejo. Esperando detrás de cada parpadeo.":""}

${e.cordura<60?"La línea entre estar despierto y dormido se difumina. Ya no estás seguro de cuál es cuál.":"No puedes dormir. No aquí. No con este silencio."}

Cuando abres los ojos, no estás en la cama.

Estás de pie. En el pasillo. Frente a la puerta principal.

No recuerdas haberte levantado.`,choices:[{text:"Aceptar lo que está pasando",nextScene:e=>e.cordura<50?"final_olvido":"figura",effects:{cordura:-15,trauma:10}},{text:"Resistir",nextScene:"decision_crucial_2",effects:{miedo:15,culpa:10}}]},decision_crucial_2:{id:"decision_crucial_2",getText:e=>`Estás agotado. El miedo se ha vuelto algo constante, como un zumbido de fondo. Ya no puedes distinguir cuánto tiempo ha pasado.

${e.trauma>30?"Has visto cosas que no puedes explicar. Cosas que quizá no son reales. Cosas que quizá lo son.":"El apartamento se siente como una trampa. Familiar pero hostil."}

Tienes que actuar. Ahora.`,choices:[{text:"Abrir la puerta principal. Salir de aquí.",nextScene:"abrir_puerta",effects:{trauma:10}},{text:"Esperar en silencio",nextScene:"figura",effects:{paranoia:15}},{text:"Rendirse",nextScene:"final_olvido",condition:e=>e.cordura<40,effects:{cordura:-20}}]},figura:{id:"figura",timeLimit:5,timeoutScene:"paralisis",getText:e=>e.cordura<50?`La figura está ahí. Ha estado ahí todo el tiempo, ¿verdad? Quizá desde antes de que despertaras. Quizá desde siempre.

No tiene rostro. O tiene demasiados rostros. Cambia cada vez que parpadeas — tu cara, la cara de la fotografía, la cara del espejo.

Se mueve. No camina. Se desplaza. Como una sombra que ha aprendido a existir en tres dimensiones.

Dice tu nombre.

Con tu voz.`:`Al fondo del pasillo hay alguien.

Una silueta. Inmóvil. No puedes distinguir sus rasgos en la penumbra, pero sabes que te está mirando.

No se mueve. No habla. Solo está ahí, ocupando un espacio que hace un momento estaba vacío.

El silencio entre los dos es insoportable.`,choices:[{text:"Enfrentarla. Avanzar.",nextScene:"confrontacion",effects:{miedo:15,trauma:10}},{text:"Huir hacia la puerta principal",nextScene:"huida",effects:{miedo:20},isTimeoutDefault:!0}]},paralisis:{id:"paralisis",getText:e=>`No puedes moverte.

Tu cuerpo se niega a responder. El miedo te ha paralizado, clavado al suelo como un insecto en un alfiler.

La figura avanza. Cada paso que da parece durar una eternidad y un instante al mismo tiempo.

Se acerca.

Se acerca.

Está frente a ti.

Extiende una mano — tu mano, con tus dedos, con tu cicatriz — y la posa sobre tu rostro.

Todo se vuelve silencio.`,choices:[{text:"...",nextScene:"final_olvido",effects:{cordura:-30}}]},confrontacion:{id:"confrontacion",getText:e=>{let a="";return e.abrio_caja?a=`Avanzas con el cuaderno en la mano. La figura no retrocede.

Cuando estás lo suficientemente cerca, la reconoces.

Eres tú.

No como un reflejo. Como otra persona que lleva tu cara. Tiene tus ojos, pero más cansados. Tu boca, pero la línea de los labios es más dura. Como si hubiera vivido años que tú no recuerdas.

"¿Cuántas veces?" — preguntas, levantando el cuaderno.

La figura — tú — sonríe con una tristeza que te rompe por dentro.

"Las suficientes."`:e.vio_reflejo&&e.contesto_telefono?a=`Te acercas a la figura. Con cada paso, se vuelve más clara. Más definida.

Es tu rostro. Tu cuerpo. Pero la expresión es diferente — hay algo detrás de esos ojos que reconoces como tuyos pero que no entiendes.

Compasión. Te mira con compasión.

"Llevas mucho tiempo aquí," dice. Con tu voz. "Más del que crees."

"¿Qué eres?" preguntas.

"La pregunta correcta es: ¿qué eres tú?"`:a=`La figura te espera. Cuando llegas frente a ella, la penumbra se disipa lo suficiente para ver.

Un rostro. Tu rostro. Pero no exactamente — como una copia imperfecta, como el recuerdo de un recuerdo.

"Has tardado más que las otras veces," dice.

Su voz es la tuya filtrada a través de algo que no puedes identificar. Distancia. Tiempo. Olvido.`,a},choices:[{text:"¿Qué es este lugar?",nextScene:e=>e.abrio_caja?"final_aceptacion":"final_silencio",effects:{culpa:10}},{text:"No eres real.",nextScene:"final_silencio",effects:{paranoia:15},condition:e=>e.paranoia>30},{text:"Acepto lo que sea que soy.",nextScene:"final_aceptacion",effects:{cordura:-10,culpa:15},condition:e=>e.abrio_caja>0||e.trauma>30}]},huida:{id:"huida",getText:e=>`Corres. Tus pies golpean el suelo del pasillo. La puerta principal está ahí, a metros.

${e.paranoia>40?"Detrás de ti, el sonido de pasos. Tus pasos. Exactamente tus pasos, como un eco que viene de la dirección equivocada.":"No miras atrás. No puedes mirar atrás."}

Llegas a la puerta. El pomo. El cerrojo.`,choices:[{text:"Abrir y salir",nextScene:"final_ecos",effects:{miedo:15}},{text:"Detenerse. Darse vuelta.",nextScene:"final_silencio",effects:{cordura:-15,trauma:15}}]},final_silencio:{id:"final_silencio",isEnding:!0,endingType:"malo",endingTitle:"El Silencio Permanece",getText:e=>`El silencio te envuelve. No como una ausencia de sonido, sino como una presencia. Una entidad que llena cada espacio, cada grieta, cada pensamiento.

La figura ya no está. O quizá siempre estuvo y es todo lo demás lo que ha desaparecido.

Te sientas en el suelo. El frío del suelo es lo último que sientes con claridad.

El apartamento se queda en silencio.

Como siempre ha estado.

Como siempre estará.

En algún lugar, un reloj marca las 3:33.`,choices:[]},final_ecos:{id:"final_ecos",isEnding:!0,endingType:"neutro",endingTitle:"Ecos",getText:e=>`Sales. Bajas las escaleras. Cada piso que desciendes se siente como despertar de una capa más de sueño.

Llegas a la calle. El aire frío de la noche te golpea la cara como una bofetada de realidad.

Hay farolas. Coches aparcados. El sonido distante de la ciudad.

Pero cuando miras hacia atrás, hacia la ventana de tu apartamento en el tercer piso, la luz está encendida.

Y hay alguien de pie junto a la ventana.

Mirándote.

Te das vuelta y empiezas a caminar. No miras atrás.

Pero durante el resto de tu vida, en los momentos de silencio — justo antes de dormir, en una habitación vacía, en una pausa entre palabras — escucharás un eco.

Tu nombre. Susurrado por una voz que es casi la tuya.`,choices:[]},final_puerta:{id:"final_puerta",isEnding:!0,endingType:"perturbador",endingTitle:"Lo Que Hay Detrás",getText:e=>`La oscuridad al otro lado de la puerta se derrama hacia dentro como líquido. No puedes cerrarla. No puedes moverte.

La oscuridad te toca. Es fría y cálida al mismo tiempo. Familiar. Como un abrazo de alguien que conoces pero no puedes recordar.

Y entonces lo entiendes.

No hay nada al otro lado de la puerta porque no hay otro lado. No hay edificio. No hay ciudad. No hay mundo.

Solo está el apartamento. Y el silencio. Y tú.

O lo que queda de ti.

La puerta se cierra sola. Estás dentro de nuevo. En el mismo lugar. En la misma noche.

El reloj marca las 3:33.

Algo te dice que siempre ha sido así. Que el mundo que recuerdas — la calle, el sol, las otras personas — fue solo un sueño que tuviste una vez.

Y ahora estás despierto.`,choices:[]},final_aceptacion:{id:"final_aceptacion",isEnding:!0,endingType:"ambiguo",endingTitle:"Aceptación",getText:e=>`"¿Cuántas veces hemos hecho esto?" preguntas.

La figura — tú, el otro tú, el tú que recuerda — te mira con una expresión que está entre la piedad y la admiración.

"Muchas. Cada vez olvidas. Cada vez despiertas. Cada vez eliges."

"¿Y esta vez?"

"Esta vez estás preguntando. Eso es nuevo."

El silencio entre los dos es diferente ahora. No es amenazante. Es... paciente.

"No puedo salir, ¿verdad?"

"No hay fuera. Nunca lo hubo."

Asientes. La verdad se asienta en tu pecho como una piedra que siempre estuvo ahí pero que recién ahora puedes sentir.

"Pero puedo recordar."

La figura sonríe. Esta vez, la sonrisa es genuina.

"Sí. Eso sí puedes."

Cierras los ojos. Cuando los abres, el apartamento está en silencio. Pero ahora el silencio tiene un significado diferente.

No es una jaula.

Es un eco.

Tu eco.`,choices:[]},final_bucle:{id:"final_bucle",isEnding:!0,endingType:"perturbador",endingTitle:"El Bucle",getText:e=>`Las puertas del ascensor se cierran.

El número 3 parpadea en el indicador.

Sientes el movimiento — hacia abajo, o eso crees — pero cuando las puertas se abren, estás en el mismo pasillo. Piso 3.

Tu puerta está ahí. Entreabierta.

Entras. El apartamento es el mismo. Todo está en su lugar.

Hay una nota sobre la mesa de la cocina.

Te acuestas en la cama. Cierras los ojos.

.
.
.

Abres los ojos.

El techo está ahí. Blanco. Familiar.

Pero algo ha cambiado.

No sabes qué.

El reloj marca las 3:33.

Y el silencio espera.`,choices:[]},final_olvido:{id:"final_olvido",isEnding:!0,endingType:"malo",endingTitle:"Olvidado",getText:e=>`La oscuridad se cierra a tu alrededor como un puño.

Intentas recordar tu nombre. No puedes.

Intentas recordar este lugar. Las paredes se difuminan.

Intentas recordar por qué tenías miedo. El miedo se disuelve, pero lo que lo reemplaza es peor: nada. Una nada absoluta, sin fondo, sin horizonte.

Olvidas la nota. Olvidas la puerta. Olvidas el espejo y el teléfono y las fotografías.

Olvidas que olvidaste.

Lo último que se desvanece es una sensación. No un recuerdo. Una sensación:

La certeza de que alguien — algo — te está observando.

Y luego, ni siquiera eso.

Solo silencio.

Solo silencio.



Solo`,choices:[]}},te=6,oe={final_silencio:{title:"El Silencio Permanece",type:"malo",hint:"Cuando el miedo gana, el silencio se lo queda todo."},final_ecos:{title:"Ecos",type:"neutro",hint:"Escapar no significa dejar atrás."},final_puerta:{title:"Lo Que Hay Detrás",type:"perturbador",hint:"Algunas puertas no deberían abrirse. Nunca."},final_aceptacion:{title:"Aceptación",type:"ambiguo",hint:"La verdad no libera. Pero al menos es real."},final_bucle:{title:"El Bucle",type:"perturbador",hint:"El tiempo es un círculo. El olvido es la curva."},final_olvido:{title:"Olvidado",type:"malo",hint:"Hay cosas peores que el miedo."}};let _=null,E=0,L=0,w=null,M=null;function se(e,a,n,t=!1){C(),L=e,E=e,w=a,M=n;const o=document.getElementById("timer-container"),s=document.getElementById("timer-bar");t||(o.classList.remove("hidden"),s.style.width="100%",s.classList.remove("warning","critical"));const i=Date.now();_=setInterval(()=>{const c=(Date.now()-i)/1e3;E=Math.max(0,L-c);const u=E/L*100;s.style.width=u+"%",u<20?(s.classList.add("critical"),s.classList.remove("warning")):u<40&&(s.classList.add("warning"),s.classList.remove("critical")),M&&M(E,L),E<=0&&(C(),w&&w())},50)}function C(){_&&(clearInterval(_),_=null);const e=document.getElementById("timer-container");e&&e.classList.add("hidden");const a=document.getElementById("timer-bar");a&&(a.classList.remove("warning","critical"),a.style.width="100%")}const I="echoes_save",K="echoes_endings";function re(){return localStorage.getItem(I)!==null}function ie(e){const a={currentScene:e.currentScene,variables:{...e.variables},history:[...e.history],timestamp:Date.now()};localStorage.setItem(I,JSON.stringify(a))}function ce(){const e=localStorage.getItem(I);if(!e)return null;try{return JSON.parse(e)}catch{return null}}function N(){localStorage.removeItem(I)}function W(){const e=localStorage.getItem(K);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function le(e,a,n){const t=W();t.find(o=>o.id===e)||(t.push({id:e,title:a,type:n,unlockedAt:Date.now()}),localStorage.setItem(K,JSON.stringify(t)))}let p=null,d=null,f=null,g=null,T=null,h=!1;function b(){return p||(p=new(window.AudioContext||window.webkitAudioContext),d=p.createGain(),d.gain.value=.3,d.connect(p.destination)),p}function P(){if(h)return;const e=b();e.state==="suspended"&&e.resume(),h=!0,ue()}function ue(){const e=b();g=e.createGain(),g.gain.value=.08,g.connect(d),f=e.createOscillator(),f.type="sine",f.frequency.value=55,f.connect(g),f.start();const a=e.createOscillator();a.type="sine",a.frequency.value=55.8;const n=e.createGain();n.gain.value=.05,a.connect(n),n.connect(d),a.start(),T=e.createOscillator(),T.type="sine",T.frequency.value=.15;const t=e.createGain();t.gain.value=.03,T.connect(t),t.connect(g.gain),T.start()}function de(e){if(!g||!p)return;const a=.04+e*.12;g.gain.setTargetAtTime(a,p.currentTime,.5),f&&f.frequency.setTargetAtTime(55-e*15,p.currentTime,1)}function q(){if(!h)return;const e=b(),a=e.createOscillator(),n=e.createGain();a.type="square",a.frequency.value=800,n.gain.value=.06,n.gain.exponentialRampToValueAtTime(.001,e.currentTime+.08),a.connect(n),n.connect(d),a.start(),a.stop(e.currentTime+.08)}function U(){if(!h)return;const e=b(),a=e.createOscillator(),n=e.createGain();a.type="sine",a.frequency.value=80,a.frequency.exponentialRampToValueAtTime(30,e.currentTime+.4),n.gain.value=.15,n.gain.exponentialRampToValueAtTime(.001,e.currentTime+.5),a.connect(n),n.connect(d),a.start(),a.stop(e.currentTime+.5);const t=e.sampleRate*.3,o=e.createBuffer(1,t,e.sampleRate),s=o.getChannelData(0);for(let l=0;l<t;l++)s[l]=(Math.random()*2-1)*Math.exp(-l/(t*.1));const i=e.createBufferSource();i.buffer=o;const c=e.createGain();c.gain.value=.04;const u=e.createBiquadFilter();u.type="lowpass",u.frequency.value=400,i.connect(u),u.connect(c),c.connect(d),i.start()}function me(){if(!h)return;const e=b();function a(n){const t=e.createOscillator(),o=e.createGain();t.type="sine",t.frequency.value=60,o.gain.value=0,o.gain.setValueAtTime(0,e.currentTime+n),o.gain.linearRampToValueAtTime(.2,e.currentTime+n+.05),o.gain.exponentialRampToValueAtTime(.001,e.currentTime+n+.2),t.connect(o),o.connect(d),t.start(e.currentTime+n),t.stop(e.currentTime+n+.25)}a(0),a(.18)}function V(){if(!h)return;const e=b();[330,349].forEach(a=>{const n=e.createOscillator(),t=e.createGain();n.type="sawtooth",n.frequency.value=a,t.gain.value=.05,t.gain.setValueAtTime(.05,e.currentTime),t.gain.linearRampToValueAtTime(.08,e.currentTime+.15),t.gain.exponentialRampToValueAtTime(.001,e.currentTime+.6),n.connect(t),t.connect(d),n.start(),n.stop(e.currentTime+.6)})}function pe(){if(!h)return;const e=b(),a=e.createOscillator(),n=e.createGain();a.type="sine",a.frequency.value=220,a.frequency.linearRampToValueAtTime(110,e.currentTime+3),n.gain.value=.12,n.gain.exponentialRampToValueAtTime(.001,e.currentTime+3),a.connect(n),n.connect(d),a.start(),a.stop(e.currentTime+3.1);const t=e.sampleRate*2,o=e.createBuffer(1,t,e.sampleRate),s=o.getChannelData(0);for(let l=0;l<t;l++)s[l]=(Math.random()*2-1)*Math.exp(-l/(t*.3));const i=e.createBufferSource();i.buffer=o;const c=e.createGain();c.gain.value=.02;const u=e.createBiquadFilter();u.type="lowpass",u.frequency.value=300,i.connect(u),u.connect(c),c.connect(d),i.start()}let y=null,j=null,z=!1;function X(e,a,n=30){return new Promise(t=>{Z(),z=!0,j=t,e.innerHTML="",e.classList.add("typing");const o=a.split(`

`);let s=0,i=0,c=document.createElement("p");e.appendChild(c);const u=()=>{if(s>=o.length){clearInterval(y),y=null,z=!1,e.classList.remove("typing"),t();return}const x=o[s];if(i>=x.length){if(s++,i=0,s<o.length){c=document.createElement("p"),e.appendChild(c);const O=document.getElementById("narrative-container");O&&(O.scrollTop=O.scrollHeight)}return}const k=x[i];k===`
`?c.appendChild(document.createElement("br")):c.textContent+=k,i++;const D=document.getElementById("narrative-container");D&&(D.scrollTop=D.scrollHeight)};let l=0;y=setInterval(()=>{u(),l++,l%3===0&&c.textContent[c.textContent.length-1]},n)})}function Z(){y&&(clearInterval(y),y=null),z=!1}function F(e,a){Z(),e.innerHTML="",a.split(`

`).forEach(t=>{const o=document.createElement("p");o.innerHTML=t.replace(/\n/g,"<br>"),e.appendChild(o)}),j&&(j(),j=null)}function Q(){return z}function fe(e,a){const n=document.getElementById("choices-container");n.innerHTML="",n.classList.remove("visible"),setTimeout(()=>{e.forEach((t,o)=>{const s=document.createElement("button");s.className="choice-btn",s.textContent=t.text,s.style.opacity="0",s.style.transform="translateX(-10px)",setTimeout(()=>{s.style.transition="opacity 0.4s ease, transform 0.4s ease",s.style.opacity="1",s.style.transform="translateX(0)"},o*120),s.addEventListener("click",()=>{n.querySelectorAll(".choice-btn").forEach(i=>{i.disabled=!0,i.classList.add("disabled")}),s.classList.add("chosen"),a(o)}),n.appendChild(s)}),n.classList.add("visible")},300)}function ge(){const e=document.getElementById("choices-container");e.innerHTML="",e.classList.remove("visible")}function v(e){document.querySelectorAll(".screen").forEach(n=>{n.classList.remove("active")});const a=document.getElementById(e);a&&a.classList.add("active")}function Y(e="white",a=150){const n=document.getElementById("flash-overlay");n.style.backgroundColor=e,n.classList.add("active"),setTimeout(()=>n.classList.remove("active"),a)}function H(e=400){const a=document.getElementById("glitch-layer");a.classList.add("active"),setTimeout(()=>a.classList.remove("active"),e)}function he(e){const a=document.documentElement,n=Math.min(e.miedo/100,1);a.style.setProperty("--vignette-intensity",.3+n*.5);const t=Math.max(e.cordura/100,0);a.style.setProperty("--saturation",t),a.style.setProperty("--noise-opacity",.03+(1-t)*.08);const o=Math.min(e.paranoia/100,1);a.style.setProperty("--distortion",o*2),document.body.classList.toggle("high-fear",e.miedo>60),document.body.classList.toggle("low-sanity",e.cordura<40),document.body.classList.toggle("high-paranoia",e.paranoia>50)}function ve(e){const a=document.getElementById("narrative-text");a.style.opacity="0",setTimeout(()=>{e(),setTimeout(()=>{a.style.opacity="1"},50)},400)}function be(e,a,n){const t=document.getElementById("endings-list");t.innerHTML="",Object.keys(a).forEach(i=>{const c=a[i],u=e.find(x=>x.id===i),l=document.createElement("div");l.className="ending-card"+(u?" unlocked":" locked"),u?l.innerHTML=`
        <h3>${c.title}</h3>
        <p class="ending-card-hint">${c.hint}</p>
      `:l.innerHTML=`
        <h3>???</h3>
        <p class="ending-card-hint">Final no descubierto</p>
      `,t.appendChild(l)});const s=document.createElement("p");s.className="endings-counter",s.textContent=`${e.length} / ${n} finales desbloqueados`,t.appendChild(s)}function xe(e,a={}){const n=document.querySelector(".ending-content"),t=document.getElementById("ending-title"),o=document.getElementById("ending-type-label"),s=document.getElementById("ending-text"),i=n.querySelector(".ending-buttons");n.querySelectorAll(":scope > *").forEach(l=>{l.classList.remove("visible")}),t.textContent=e.endingTitle,o.textContent="FIN",o.className="ending-type-badge",s.innerHTML="",[n.querySelector(".ending-icon"),t,o,s,i].forEach((l,x)=>{l&&setTimeout(()=>l.classList.add("visible"),500+x*600)});const u=typeof e.getText=="function"?e.getText(a):e.getText;setTimeout(()=>{X(s,u,40)},500+3*600)}let S=!1,G=null,m=null;const ye=.85,Ee=.75;function Te(){if(!("speechSynthesis"in window))return;const e=()=>{const a=speechSynthesis.getVoices();a.length!==0&&(G=a.find(n=>n.lang.startsWith("es")&&n.localService)||a.find(n=>n.lang.startsWith("es"))||a.find(n=>n.lang.startsWith("en")&&n.localService)||a[0])};e(),speechSynthesis.onvoiceschanged=e}function Se(){return S=!S,S||A(),S}function qe(){return"speechSynthesis"in window}function ee(e){if(!S||!("speechSynthesis"in window))return;A();const a=e.replace(/\n+/g,". ").replace(/["""''«»]/g,"").replace(/—/g,", ").replace(/\.\.\./g,"...").replace(/\s{2,}/g," ").trim();a&&(m=new SpeechSynthesisUtterance(a),m.rate=ye,m.pitch=Ee,m.volume=.9,G&&(m.voice=G),m.lang="es-ES",m.onend=()=>{m=null},speechSynthesis.speak(m))}function A(){"speechSynthesis"in window&&speechSynthesis.cancel(),m=null}let r={currentScene:"inicio",variables:{...$},history:[]},R="";function J(){Le(),je(),_e(),v("menu-screen"),re()&&(document.getElementById("btn-continue").style.display="",document.getElementById("btn-delete").style.display=""),Te()}function Le(){document.getElementById("btn-new-game").addEventListener("click",()=>{P(),ae()}),document.getElementById("btn-continue").addEventListener("click",()=>{P(),Ce()}),document.getElementById("btn-endings").addEventListener("click",()=>{P(),Be()}),document.getElementById("btn-delete").addEventListener("click",()=>{confirm("¿Borrar todo el progreso? Esta acción no se puede deshacer.")&&(N(),document.getElementById("btn-continue").style.display="none",document.getElementById("btn-delete").style.display="none",q())}),document.getElementById("btn-restart").addEventListener("click",()=>{A(),N(),v("menu-screen"),document.getElementById("btn-continue").style.display="none",document.getElementById("btn-delete").style.display="none",q()}),document.getElementById("btn-back-menu").addEventListener("click",()=>{v("menu-screen"),q()})}function _e(){const e=document.getElementById("btn-narration");if(!qe()){e.style.display="none";return}e.addEventListener("click",()=>{const a=Se(),n=e.querySelector(".narration-status");n.textContent=a?"ON":"OFF",e.classList.toggle("active",a),e.title=a?"Narración activada":"Narración desactivada",q()})}function je(){document.getElementById("narrative-container").addEventListener("click",e=>{if(Q()){e.stopPropagation();const a=document.getElementById("narrative-text");F(a,R)}}),document.addEventListener("keydown",e=>{if((e.code==="Space"||e.code==="Enter")&&Q()){e.preventDefault();const a=document.getElementById("narrative-text");F(a,R)}})}function ae(){r={currentScene:"inicio",variables:{...$},history:[]},N(),U(),Y("black",800),setTimeout(()=>{v("game-screen"),B("inicio")},600)}function Ce(){const e=ce();if(!e){ae();return}r.currentScene=e.currentScene,r.variables={...$,...e.variables},r.history=e.history||[],U(),v("game-screen"),B(r.currentScene)}function B(e){const a=ne[e];if(!a){console.error(`Scene not found: ${e}`);return}r.currentScene=e,C(),ge(),he(r.variables);const n=Math.min((r.variables.miedo+r.variables.paranoia)/150,1);de(n);const t=typeof a.getText=="function"?a.getText(r.variables):a.getText;if(R=t,a.isEnding){Ae(a);return}ve(()=>{const o=document.getElementById("narrative-text");X(o,t,28).then(()=>{Ne(a)}),ee(t),a.timeLimit&&Ie(a),ie(r)})}function Ne(e){const n=e.choices.filter(t=>t.condition?t.condition(r.variables):!0).map(t=>({...t,text:typeof t.text=="function"?t.text(r.variables):t.text}));fe(n,t=>{ze(n[t])})}function ze(e){q(),C(),A(),e.effects&&(Object.entries(e.effects).forEach(([n,t])=>{r.variables[n]!==void 0?r.variables[n]+=t:r.variables[n]=t}),r.variables.miedo=Math.max(0,Math.min(100,r.variables.miedo)),r.variables.cordura=Math.max(0,Math.min(100,r.variables.cordura)),r.variables.paranoia=Math.max(0,Math.min(100,r.variables.paranoia)),r.variables.culpa=Math.max(0,Math.min(100,r.variables.culpa)),r.variables.trauma=Math.max(0,Math.min(100,r.variables.trauma))),r.history.push({scene:r.currentScene,choice:e.text});const a=typeof e.nextScene=="function"?e.nextScene(r.variables):e.nextScene;setTimeout(()=>{H(200),U(),setTimeout(()=>B(a),300)},200)}function Ie(e){const a={done:!1};let n=0;const t=!!e.timerHidden;se(e.timeLimit,()=>{if(Y("rgba(139, 0, 0, 0.4)",300),H(500),t||V(),e.timeoutScene){const o=e.choices.find(s=>s.isTimeoutDefault);o&&(r.history.push({scene:r.currentScene,choice:"[tiempo agotado]"}),o.effects&&Object.entries(o.effects).forEach(([s,i])=>{r.variables[s]!==void 0?r.variables[s]+=i:r.variables[s]=i})),setTimeout(()=>B(e.timeoutScene),400)}},(o,s)=>{if(t)return;const i=o/s,c=Date.now();i<.4&&!a.done&&(a.done=!0,V()),i<.3&&c-n>800&&(n=c,me()),i<.3&&Math.random()<.05&&(document.getElementById("game-screen").classList.add("flicker"),setTimeout(()=>{document.getElementById("game-screen").classList.remove("flicker")},100)),i<.15&&Math.random()<.08&&H(100)},t)}function Ae(e){le(e.id,e.endingTitle,e.endingType),N(),pe(),Y("black",1500),setTimeout(()=>{v("ending-screen"),xe(e,r.variables);const a=typeof e.getText=="function"?e.getText(r.variables):e.getText;ee(a)},1200)}function Be(){const e=W();be(e,oe,te),v("endings-screen")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",J):J();
