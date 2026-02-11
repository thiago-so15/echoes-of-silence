/**
 * Story data — Complete narrative for Echoes of Silence
 *
 * Variables tracked:
 *   miedo (0-100)     — Fear level
 *   cordura (100-0)   — Sanity, decreases
 *   paranoia (0-100)  — Paranoia / distrust
 *   culpa (0-100)     — Guilt
 *   trauma (0-100)    — Accumulated traumatic decisions
 *
 * Flags (boolean-ish in variables):
 *   vio_reflejo       — Saw the mirror reflection
 *   contesto_telefono — Answered the phone
 *   abrio_caja        — Opened the box in the basement
 *   conoce_sotano     — Knows about the basement
 *   vio_fotos         — Saw the photographs
 *   leyó_nota         — Read the note carefully
 *   nombre_susurrado  — Heard the whisper
 */

export const DEFAULT_VARIABLES = {
  miedo: 0,
  cordura: 100,
  paranoia: 0,
  culpa: 0,
  trauma: 0,
  vio_reflejo: 0,
  contesto_telefono: 0,
  abrio_caja: 0,
  conoce_sotano: 0,
  vio_fotos: 0,
  leyo_nota: 0,
  nombre_susurrado: 0,
};

/**
 * Get dynamic text based on variables
 */
function t(normal, altText, condFn, vars) {
  return condFn(vars) ? altText : normal;
}

export const SCENES = {
  // ═══════════════════════════════════════════
  //  ACT 1 — EL DESPERTAR
  // ═══════════════════════════════════════════

  inicio: {
    id: 'inicio',
    getText: (v) =>
      `Abres los ojos.\n\nEl techo está ahí. Blanco. Familiar. Pero algo ha cambiado. No sabes qué. No sabes cuándo.\n\nSolo sabes que el silencio que llena la habitación no es el silencio normal de las tres de la madrugada.\n\nEste silencio tiene peso.\n\n${v.paranoia > 0 ? 'Este silencio te observa.' : 'Este silencio... espera.'}`,
    choices: [
      {
        text: 'Levantarse lentamente',
        nextScene: 'habitacion',
        effects: { miedo: 5 },
      },
      {
        text: 'Quedarse inmóvil. Escuchar.',
        nextScene: 'escuchar',
        effects: { paranoia: 10 },
      },
    ],
  },

  escuchar: {
    id: 'escuchar',
    getText: (v) =>
      `Te quedas quieto. Completamente quieto.\n\nEl silencio se espesa. Se vuelve algo casi físico, como una manta húmeda sobre tu pecho. Escuchas tu propia respiración. El latido de tu corazón. El zumbido eléctrico de algo que no logras identificar.\n\nY debajo de todo eso... algo más.\n\nUn sonido que no debería estar ahí. Tan bajo que podrías estar imaginándolo.`,
    choices: [
      {
        text: 'Levantarse de golpe',
        nextScene: 'habitacion',
        effects: { miedo: 15 },
      },
      {
        text: 'Seguir escuchando',
        nextScene: 'susurro',
        effects: { paranoia: 15, cordura: -5 },
      },
    ],
  },

  susurro: {
    id: 'susurro',
    timeLimit: 8,
    timeoutScene: 'habitacion_oscura',
    getText: (v) =>
      `Lo escuchas claramente ahora.\n\nEs una voz. No. No es una voz. Es algo que se parece a una voz de la misma manera que una sombra se parece a la persona que la proyecta.\n\nDice tu nombre.\n\nO eso crees.\n\nViene de dentro del apartamento.`,
    choices: [
      {
        text: '¡¿Quién está ahí?!',
        nextScene: 'eco',
        effects: { miedo: 10, nombre_susurrado: 1 },
      },
      {
        text: 'No responder. No hacer ruido.',
        nextScene: 'habitacion_oscura',
        effects: { paranoia: 15, nombre_susurrado: 1 },
        isTimeoutDefault: true,
      },
    ],
  },

  eco: {
    id: 'eco',
    getText: (v) =>
      `Tu voz rompe el silencio como cristal contra el suelo.\n\nEl eco rebota por las paredes. Se distorsiona. Por un instante — solo un instante — juras que el eco no suena exactamente como tu voz.\n\nSuena como si alguien te estuviera imitando.\n\nDesde algún lugar del pasillo.\n\nLuego, nada. El silencio regresa, más denso que antes.`,
    choices: [
      {
        text: 'Ir hacia el pasillo',
        nextScene: 'pasillo_oscuro',
        effects: { miedo: 15, trauma: 5 },
      },
    ],
  },

  habitacion: {
    id: 'habitacion',
    getText: (v) =>
      `Te incorporas en la cama. La habitación está en penumbras — la luz de la calle se filtra apenas por las cortinas, dibujando líneas grises en el suelo.\n\nTodo parece estar en su lugar. La silla. El armario. La puerta entreabierta.\n\n${v.miedo > 10 ? 'Pero no puedes evitar la sensación de que algo se ha movido mientras tenías los ojos cerrados.' : 'El reloj de la mesita marca las 3:33.'}\n\nEl interruptor de la luz está junto a la puerta.`,
    choices: [
      {
        text: 'Encender la luz',
        nextScene: 'habitacion_luz',
        effects: {},
      },
      {
        text: 'Salir al pasillo en la oscuridad',
        nextScene: 'pasillo_oscuro',
        effects: { miedo: 10, paranoia: 5 },
      },
    ],
  },

  habitacion_oscura: {
    id: 'habitacion_oscura',
    getText: (v) =>
      `Te levantas en silencio. La oscuridad es casi total — solo la línea de luz bajo la puerta del pasillo te indica dónde estás.\n\n${v.nombre_susurrado ? 'El susurro se ha detenido. O quizá simplemente se ha vuelto parte del silencio.' : 'La quietud es absoluta.'}\n\nEl aire está extrañamente frío.`,
    choices: [
      {
        text: 'Buscar el interruptor',
        nextScene: 'habitacion_luz',
        effects: { miedo: 5 },
      },
      {
        text: 'Salir sin encender la luz',
        nextScene: 'pasillo_oscuro',
        effects: { paranoia: 10 },
      },
    ],
  },

  habitacion_luz: {
    id: 'habitacion_luz',
    getText: (v) =>
      `La luz parpadea dos veces antes de encenderse del todo. La habitación se revela: tu habitación. Normal. Conocida.\n\nExcepto por un detalle.\n\nLa silla que suele estar frente al escritorio está ahora junto a la cama. Mirando hacia donde dormías.\n\n${v.paranoia > 20 ? 'Estás seguro de que no la moviste.' : 'No recuerdas haberla movido. Probablemente lo hiciste antes de dormir.'}`,
    choices: [
      {
        text: 'Ir al pasillo',
        nextScene: 'pasillo',
        effects: { miedo: 5 },
      },
      {
        text: 'Revisar la habitación con cuidado',
        nextScene: 'detalle_habitacion',
        effects: { paranoia: 5 },
      },
    ],
  },

  detalle_habitacion: {
    id: 'detalle_habitacion',
    getText: (v) =>
      `Revisas la habitación. El armario está cerrado. Dentro, tu ropa, nada fuera de lugar. Los cajones del escritorio: papeles, un bolígrafo, un cuaderno.\n\nAbres el cuaderno. Las últimas páginas tienen anotaciones en tu letra, pero no las recuerdas:\n\n"No duermas."\n"No es real."\n"La puerta no lleva a ningún sitio."\n\nLa última línea está escrita con tanta presión que casi atraviesa el papel:\n\n"NO CONFÍES EN EL SILENCIO."`,
    choices: [
      {
        text: 'Ir al pasillo',
        nextScene: 'pasillo',
        effects: { miedo: 15, paranoia: 10, leyo_nota: 1 },
      },
    ],
  },

  pasillo_oscuro: {
    id: 'pasillo_oscuro',
    getText: (v) =>
      `El pasillo está oscuro. Más oscuro de lo que debería. La luz que solía filtrarse por la ventana del fondo no está ahí.\n\nTus pies descalzos tocan el suelo frío. Cada paso suena demasiado fuerte en este silencio.\n\n${v.paranoia > 15 ? 'Tienes la certeza irracional de que algo te observa desde el fondo del pasillo.' : 'A tu izquierda, la cocina. Al fondo, el salón.'}\n\nHuele a algo que no logras identificar. Algo viejo.`,
    choices: [
      {
        text: 'Avanzar hacia la cocina',
        nextScene: 'cocina',
        effects: { miedo: 5 },
      },
      {
        text: 'Volver a la habitación',
        nextScene: 'habitacion',
        effects: { miedo: 10, cordura: -5 },
      },
    ],
  },

  pasillo: {
    id: 'pasillo',
    getText: (v) =>
      `El pasillo de tu apartamento. Tres puertas: el baño a la derecha, la cocina al frente, el salón a la izquierda.\n\nLa luz del pasillo funciona, pero parpadea con un ritmo irregular que te pone nervioso.\n\n${v.miedo > 20 ? 'Cada parpadeo te hace imaginar que las sombras se mueven.' : 'Al fondo, la puerta principal. Cerrada.'}`,
    choices: [
      {
        text: 'Ir a la cocina',
        nextScene: 'cocina',
        effects: {},
      },
      {
        text: 'Ir al baño',
        nextScene: 'bano',
        effects: {},
      },
      {
        text: 'Ir al salón',
        nextScene: 'salon_vacio',
        effects: {},
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  ACT 2 — LA NOTA
  // ═══════════════════════════════════════════

  cocina: {
    id: 'cocina',
    getText: (v) =>
      `La cocina. El grifo gotea con un ritmo lento y constante. Cada gota resuena en el silencio.\n\nSobre la mesa hay una hoja de papel. Tu letra. Tinta negra, trazo irregular, como si la hubieras escrito con prisa. O con miedo.\n\nEl reloj del microondas marca las 3:33.\n\nEl mismo que el reloj de la habitación.`,
    choices: [
      {
        text: 'Leer la nota',
        nextScene: 'nota',
        effects: { leyo_nota: 1 },
      },
    ],
  },

  nota: {
    id: 'nota',
    getText: (v) =>
      `La nota dice:\n\n"Si estás leyendo esto, ya ha empezado. No abras la puerta principal. No importa lo que escuches. No importa quién llame.\n\nLo que hay fuera no es real. O lo que hay dentro no es real. Ya no estoy seguro.\n\nNo confíes en el silencio. El silencio es donde se esconde."\n\n${v.paranoia > 25 ? 'La letra se vuelve más errática al final, como si hubieras escrito con la mano temblando.' : 'Reconoces tu letra, pero no recuerdas haber escrito esto.'}\n\nLa nota no tiene fecha.`,
    choices: [
      {
        text: 'Explorar el apartamento',
        nextScene: 'explorar',
        effects: { miedo: 10 },
      },
      {
        text: 'Ir directamente a la puerta principal',
        nextScene: 'puerta_entrada',
        effects: { miedo: 5, trauma: 5 },
      },
      {
        text: 'Examinar la nota con más detalle',
        nextScene: 'nota_detalle',
        effects: { paranoia: 10 },
      },
    ],
  },

  nota_detalle: {
    id: 'nota_detalle',
    getText: (v) =>
      `Das vuelta a la nota. En el reverso hay algo más. Un dibujo hecho a bolígrafo: una puerta. Detrás de la puerta, oscuridad representada con trazos violentos y repetitivos.\n\nY en la esquina inferior, apenas legible:\n\n"El sótano. La caja. No la abras tampoco."\n\nNo sabías que tu apartamento tuviera sótano.`,
    choices: [
      {
        text: 'Explorar el apartamento',
        nextScene: 'explorar',
        effects: { miedo: 15, conoce_sotano: 1 },
      },
      {
        text: 'Ir a la puerta principal',
        nextScene: 'puerta_entrada',
        effects: { miedo: 10, trauma: 5 },
      },
    ],
  },

  explorar: {
    id: 'explorar',
    getText: (v) => {
      let text = `El apartamento se siente más pequeño de lo que recuerdas. O quizá eres tú el que se siente más grande. O más atrapado.\n\nLas paredes parecen absorber la luz. Cada rincón guarda una sombra que no debería estar ahí.`;
      if (v.conoce_sotano) {
        text += `\n\nRecuerdas las palabras de la nota: "El sótano." Ahora notas una puerta al fondo del pasillo que no habías visto antes. O que habías decidido no ver.`;
      }
      return text;
    },
    choices: [
      {
        text: 'Ir al baño',
        nextScene: 'bano',
        effects: {},
      },
      {
        text: 'Ir al salón',
        nextScene: 'salon',
        effects: {},
      },
      {
        text: 'Ir a la puerta del fondo',
        nextScene: 'puerta_fondo',
        condition: (v) => v.conoce_sotano > 0,
        effects: { miedo: 10 },
      },
      {
        text: 'Ir a la puerta principal',
        nextScene: 'puerta_entrada',
        effects: { miedo: 5 },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  ACT 2.5 — EXPLORACIÓN
  // ═══════════════════════════════════════════

  bano: {
    id: 'bano',
    getText: (v) =>
      `El baño. Azulejos blancos que reflejan la luz de forma enfermiza. El espejo sobre el lavabo.\n\nTu reflejo te devuelve la mirada.\n\n${v.paranoia > 20 ? 'O algo que se parece mucho a tu reflejo.' : 'Tienes ojeras. Profundas. Como si no hubieras dormido en días.'}\n\nEl espejo está ligeramente empañado, aunque no hay vapor.`,
    choices: [
      {
        text: 'Mirarte fijamente en el espejo',
        nextScene: 'espejo',
        effects: { paranoia: 5 },
      },
      {
        text: 'Salir del baño',
        nextScene: 'explorar',
        effects: {},
      },
    ],
  },

  espejo: {
    id: 'espejo',
    timeLimit: 6,
    timeoutScene: 'reflejo',
    getText: (v) =>
      `Te acercas al espejo. Tu reflejo te imita, como debe ser.\n\nPero mientras miras... algo cambia. Es sutil. Casi imperceptible. ¿Tu reflejo parpadeó un instante después que tú? ¿Sus labios se movieron ligeramente?\n\nSientes que si sigues mirando, vas a ver algo que no quieres ver.\n\nLa presión en tu pecho aumenta.`,
    choices: [
      {
        text: 'Seguir mirando',
        nextScene: 'reflejo',
        effects: { cordura: -15, vio_reflejo: 1, paranoia: 15 },
        isTimeoutDefault: true,
      },
      {
        text: 'Apartarse del espejo',
        nextScene: 'salon',
        effects: { miedo: 10 },
      },
    ],
  },

  reflejo: {
    id: 'reflejo',
    getText: (v) =>
      v.cordura < 70
        ? `Tu reflejo sonríe.\n\nNo es tu sonrisa. Es algo más amplio, más lento, como si los músculos de esa cara no supieran exactamente cómo funciona una sonrisa humana.\n\nRetrocedes de golpe. Cuando vuelves a mirar, el espejo muestra tu cara normal. Asustada. Pálida.\n\nPero durante un segundo — un segundo que se graba en tu memoria como hierro candente — lo que había en ese espejo no eras tú.`
        : `Miras fijamente. Tu reflejo te sostiene la mirada con una intensidad que no sientes en ti mismo.\n\nLuego — tan rápido que podrías haberlo imaginado — tu reflejo ladea la cabeza. Una fracción de segundo antes que tú.\n\nCierras los ojos. Cuando los abres, todo es normal.\n\nPero la sensación de ser observado no se va.`,
    choices: [
      {
        text: 'Salir del baño inmediatamente',
        nextScene: 'salon',
        effects: { miedo: 20, trauma: 10 },
      },
    ],
  },

  salon_vacio: {
    id: 'salon_vacio',
    getText: (v) =>
      `El salón. Sofá, mesa baja, televisor apagado. Las cortinas están cerradas.\n\nTodo parece normal. Demasiado normal. Como una escenografía de teatro — correcto en la superficie, pero vacío por dentro.\n\n${v.paranoia > 15 ? 'El aire huele a algo dulce y desagradable, como flores marchitas.' : 'Un silencio pesado ocupa la habitación.'}`,
    choices: [
      {
        text: 'Examinar el salón',
        nextScene: 'salon',
        effects: {},
      },
      {
        text: 'Volver al pasillo',
        nextScene: 'pasillo',
        effects: {},
      },
    ],
  },

  salon: {
    id: 'salon',
    getText: (v) => {
      let base = `El salón. La luz de una farola se filtra por las cortinas, creando sombras alargadas que se extienden por el suelo como dedos.\n\n`;
      if (v.vio_reflejo) {
        base += `Después de lo del espejo, cada sombra parece tener intención. Cada rincón oscuro podría contener algo.\n\n`;
      }
      base += `Sobre la estantería hay fotografías enmarcadas. El televisor está apagado, pero su pantalla negra refleja la habitación de forma distorsionada.`;
      return base;
    },
    choices: [
      {
        text: 'Examinar las fotografías',
        nextScene: 'fotos',
        effects: { paranoia: 5 },
      },
      {
        text: 'Encender el televisor',
        nextScene: 'television',
        effects: { miedo: 5 },
      },
      {
        text: 'Volver',
        nextScene: 'explorar',
        effects: {},
      },
    ],
  },

  fotos: {
    id: 'fotos',
    getText: (v) =>
      `Las fotografías muestran momentos que reconoces vagamente. Cumpleaños. Reuniones. Rostros de personas que deberías recordar pero que se sienten como sueños de otra persona.\n\nEn una de las fotos apareces tú. Estás sonriendo. Pero hay algo en tus ojos — en los ojos de la fotografía — que no encaja. Una expresión que no es alegría.\n\n${v.paranoia > 30 ? 'Miras más de cerca. En el fondo de la foto, parcialmente oculta por una cortina, hay una silueta. Alguien que no debería estar ahí.\n\nAlguien que te está mirando.' : 'En la última foto, estás solo. De pie frente a una puerta que no reconoces.'}\n\nUna de las fotos está boca abajo.`,
    choices: [
      {
        text: 'Dar vuelta a la foto',
        nextScene: 'foto_reverso',
        effects: { miedo: 10, vio_fotos: 1, trauma: 5 },
      },
      {
        text: 'Dejar las fotos',
        nextScene: 'telefono_suena',
        effects: { vio_fotos: 1 },
      },
    ],
  },

  foto_reverso: {
    id: 'foto_reverso',
    getText: (v) =>
      `Das vuelta a la fotografía.\n\nEs una foto de esta habitación. Este salón. Tomada desde el ángulo exacto donde estás parado ahora.\n\nPero en la foto, hay alguien sentado en el sofá. Una figura borrosa, como si se hubiera movido durante la exposición. O como si no fuera del todo... sólida.\n\nEn el reverso de la foto, con tu letra:\n\n"Siempre ha estado aquí."`,
    choices: [
      {
        text: 'Mirar el sofá',
        nextScene: 'sofa_vacio',
        effects: { miedo: 20, cordura: -10, paranoia: 15 },
      },
    ],
  },

  sofa_vacio: {
    id: 'sofa_vacio',
    getText: (v) =>
      `Miras el sofá. Está vacío.\n\nPor supuesto que está vacío.\n\n${v.cordura < 70 ? 'Pero hay una marca en el cojín. Una depresión. Como si alguien acabara de levantarse.' : 'Sin embargo, no puedes sacarte la imagen de encima.'}\n\nEl teléfono empieza a sonar.`,
    choices: [
      {
        text: 'Contestar el teléfono',
        nextScene: 'telefono_suena',
        effects: {},
      },
    ],
  },

  television: {
    id: 'television',
    getText: (v) =>
      `Enciendes el televisor. La pantalla parpadea con estática durante unos segundos.\n\nLuego muestra una imagen. Es tu apartamento. Tu salón. Filmado desde arriba, como una cámara de seguridad.\n\n${v.cordura < 75 ? 'En la imagen del televisor, puedes verte a ti mismo mirando el televisor. Pero hay alguien más en la habitación. De pie detrás de ti.\n\nNo te atrevas a darte vuelta.' : 'La imagen se congela. Estática. Luego el televisor se apaga solo.'}\n\nEl silencio después es ensordecedor.`,
    choices: [
      {
        text: v => v.cordura < 75 ? 'Darte vuelta lentamente' : 'Continuar',
        nextScene: 'telefono_suena',
        effects: { miedo: 25, cordura: -10, trauma: 10 },
      },
    ],
  },

  telefono_suena: {
    id: 'telefono_suena',
    timeLimit: 10,
    timeoutScene: 'silencio_telefono',
    getText: (v) =>
      `El teléfono suena.\n\nEs un sonido antiguo, metálico, que no debería producir un teléfono moderno. Cada timbrazo corta el silencio como un cuchillo.\n\nEl identificador de llamadas muestra tu propio número.\n\n${v.paranoia > 30 ? 'Algo dentro de ti grita que no contestes.' : 'La curiosidad y el miedo luchan dentro de ti.'}`,
    choices: [
      {
        text: 'Contestar',
        nextScene: 'llamada',
        effects: { contesto_telefono: 1, miedo: 10 },
      },
      {
        text: 'Dejar que suene',
        nextScene: 'silencio_telefono',
        effects: { paranoia: 10 },
        isTimeoutDefault: true,
      },
    ],
  },

  llamada: {
    id: 'llamada',
    getText: (v) =>
      v.cordura < 65
        ? `Levantas el teléfono.\n\nAl principio, solo estática. Luego, una respiración. Lenta. Deliberada.\n\nY después, tu propia voz:\n\n"No debiste contestar. Ahora sabe que estás despierto."\n\nLa línea se corta. El silencio que sigue es el más profundo que has experimentado en tu vida.\n\nComo si el mundo entero estuviera conteniendo la respiración.`
        : `Levantas el teléfono.\n\nEstática. Un largo silencio. Luego una voz — distorsionada, irreconocible, pero con un ritmo que te resulta familiar:\n\n"Tienes que salir. La puerta. Sal antes de que olvides por qué necesitas salir."\n\nAntes de que puedas responder, la llamada se corta.\n\nEl eco de esas palabras se queda flotando en el aire.`,
    choices: [
      {
        text: 'Ir a la puerta principal',
        nextScene: 'puerta_entrada',
        effects: { miedo: 10 },
      },
      {
        text: 'No. La nota decía que no abriera la puerta.',
        nextScene: 'decision_crucial',
        effects: { paranoia: 10, miedo: 5 },
      },
    ],
  },

  silencio_telefono: {
    id: 'silencio_telefono',
    getText: (v) =>
      `El teléfono deja de sonar. El silencio que sigue es diferente al de antes. Más espeso. Más intencional.\n\nComo si algo estuviera decepcionado de que no hayas contestado.\n\n${v.paranoia > 25 ? 'Juras que escuchas algo. Un suspiro. Desde algún lugar del apartamento.' : 'La pantalla del teléfono muestra "1 llamada perdida". De tu propio número.'}`,
    choices: [
      {
        text: 'Ir a la puerta principal',
        nextScene: 'puerta_entrada',
        effects: { miedo: 5 },
      },
      {
        text: 'Pensar. ¿Qué está pasando?',
        nextScene: 'decision_crucial',
        effects: { paranoia: 5 },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  ACT 3 — DECISIONES
  // ═══════════════════════════════════════════

  puerta_entrada: {
    id: 'puerta_entrada',
    getText: (v) => {
      let text = `La puerta principal. Madera oscura. Cerrojo echado.\n\n`;
      if (v.leyo_nota) {
        text += `La nota decía que no la abrieras. Que lo de fuera no es real. O lo de dentro.\n\n`;
      }
      if (v.contesto_telefono) {
        text += `La voz del teléfono decía que salieras. Que salieras antes de olvidar por qué.\n\n`;
      }
      text += `Pones la mano en el pomo. Está frío. Más frío de lo normal.\n\n`;
      text += v.miedo > 40
        ? `Tu mano tiembla.`
        : `El metal te quema con su frialdad.`;
      return text;
    },
    choices: [
      {
        text: 'Abrir la puerta',
        nextScene: 'abrir_puerta',
        effects: { trauma: 15, miedo: 15 },
      },
      {
        text: 'No. No voy a abrirla.',
        nextScene: 'decision_crucial',
        effects: { miedo: 5, paranoia: 10 },
      },
    ],
  },

  abrir_puerta: {
    id: 'abrir_puerta',
    getText: (v) =>
      v.cordura < 55
        ? `Giras el pomo. La puerta se abre.\n\nAl otro lado no hay pasillo. No hay edificio. No hay calle.\n\nHay oscuridad. Una oscuridad absoluta, viva, que respira. Se mueve como humo negro, lamiendo el umbral de la puerta.\n\nY en el centro de esa oscuridad, algo te mira. No tiene ojos, pero te mira. Lo sientes en cada célula de tu cuerpo.\n\nSonríe.\n\nCon tu boca.`
        : `Giras el pomo. La puerta se abre.\n\nAl otro lado... el pasillo del edificio. Normal. Vacío. Las luces fluorescentes parpadean con su zumbido habitual.\n\nPero algo está mal. El pasillo se extiende más de lo que debería. Las puertas de los vecinos parecen estar más lejos. O quizá son más de las que recuerdas.\n\nY el silencio aquí es el mismo que dentro. Exactamente el mismo.`,
    choices: [
      {
        text: v => v.cordura < 55 ? 'Cerrar la puerta de golpe' : 'Avanzar por el pasillo',
        nextScene: v => v.cordura < 55 ? 'final_puerta' : 'exterior',
        effects: { miedo: 20, trauma: 15 },
      },
      {
        text: v => v.cordura < 55 ? 'No puedes moverte' : 'Cerrar y volver dentro',
        nextScene: v => v.cordura < 55 ? 'final_puerta' : 'decision_crucial',
        effects: { miedo: 15, cordura: -10 },
      },
    ],
  },

  exterior: {
    id: 'exterior',
    getText: (v) =>
      `Caminas por el pasillo. Tus pasos resuenan de forma extraña, como si el sonido llegara con un ligero retraso.\n\nLas puertas de los apartamentos están todas cerradas. Ninguna tiene número. Ninguna tiene mirilla.\n\nLlegas al ascensor. El indicador marca el piso 3. Tu piso. Siempre el piso 3.\n\nPulsas el botón. Las puertas se abren inmediatamente, como si te estuviera esperando.\n\nDentro del ascensor, los botones solo muestran un piso: el 3.`,
    choices: [
      {
        text: 'Entrar al ascensor',
        nextScene: 'final_bucle',
        effects: { trauma: 10, cordura: -15 },
      },
      {
        text: 'Buscar las escaleras',
        nextScene: 'final_ecos',
        effects: { miedo: 10 },
      },
    ],
  },

  decision_crucial: {
    id: 'decision_crucial',
    getText: (v) => {
      let text = `Estás de pie en el centro de tu apartamento. El silencio pulsa a tu alrededor como un corazón enorme.\n\n`;
      if (v.trauma > 20) {
        text += `Has visto demasiado. Cada sombra tiene forma. Cada silencio tiene voz.\n\n`;
      }
      text += `Tienes que tomar una decisión. No puedes quedarte aquí para siempre en este punto intermedio entre la acción y la parálisis.`;
      if (v.conoce_sotano) {
        text += `\n\nLa puerta del fondo — la que lleva al sótano — parece llamarte en silencio.`;
      }
      return text;
    },
    choices: [
      {
        text: 'Abrir la puerta principal',
        nextScene: 'puerta_entrada',
        effects: { miedo: 5 },
      },
      {
        text: 'Bajar al sótano',
        nextScene: 'puerta_fondo',
        condition: (v) => v.conoce_sotano > 0,
        effects: { miedo: 15 },
      },
      {
        text: 'Quedarse. Esperar.',
        nextScene: 'espera',
        effects: { paranoia: 15, cordura: -5 },
      },
      {
        text: 'Intentar dormir',
        nextScene: 'intentar_dormir',
        effects: { cordura: -10 },
      },
    ],
  },

  puerta_fondo: {
    id: 'puerta_fondo',
    timeLimit: 5,
    timeoutScene: 'decision_crucial_2',
    getText: (v) =>
      `La puerta del fondo del pasillo. No tiene picaporte visible. Es de un color oscuro que parece absorber la luz.\n\nCuando pones la mano sobre ella, sientes vibración. Como si algo del otro lado estuviera en movimiento.\n\nLa puerta cede con un empujón. Detrás, escaleras que descienden hacia una oscuridad total.\n\nUn aire frío y húmedo sube desde abajo, trayendo un olor a tierra y a algo más. Algo orgánico.`,
    choices: [
      {
        text: 'Descender',
        nextScene: 'sotano',
        effects: { miedo: 20, trauma: 10 },
      },
      {
        text: 'Cerrar la puerta. No.',
        nextScene: 'decision_crucial_2',
        effects: { miedo: 10 },
        isTimeoutDefault: true,
      },
    ],
  },

  sotano: {
    id: 'sotano',
    getText: (v) =>
      `Bajas las escaleras. Cada peldaño cruje bajo tu peso. La oscuridad te envuelve como agua fría.\n\nLlegas a un espacio amplio. El suelo es de tierra. El techo es bajo — puedes sentirlo aunque no lo veas.\n\nTu mano encuentra una pared húmeda. Sigues la pared hasta que tus dedos tropiezan con algo: un interruptor.\n\nLa luz se enciende: un bombillo desnudo que proyecta sombras duras.\n\nEl sótano está vacío. Completamente vacío.\n\nExcepto por una caja de madera en el centro.`,
    choices: [
      {
        text: 'Abrir la caja',
        nextScene: 'caja',
        effects: { miedo: 15, trauma: 10, abrio_caja: 1 },
      },
      {
        text: 'Subir. No quieres saber.',
        nextScene: 'decision_crucial_2',
        effects: { miedo: 10, cordura: -5 },
      },
    ],
  },

  caja: {
    id: 'caja',
    getText: (v) =>
      `Abres la caja.\n\nDentro hay objetos. Tus objetos. Tu reloj — el que pensabas que habías perdido. Una entrada de cine de hace meses. Tu cartera con tus documentos. Las llaves de este apartamento.\n\nY al fondo, un cuaderno. Diferente al de arriba. Más gastado. Más grueso.\n\nLo abres.\n\nPáginas y páginas con la misma frase, repetida cientos de veces:\n\n"No es la primera vez."\n\nEn las últimas páginas, la frase cambia:\n\n"No es la primera vez. Nunca es la primera vez. Cada vez que despiertas, olvidas. Cada vez que olvidas, vuelves a empezar."\n\n${v.vio_reflejo ? 'Y debajo, un dibujo de un rostro. Tu rostro. Sonriendo de la misma manera que tu reflejo en el espejo.' : 'Y debajo, una flecha señalando hacia arriba. Hacia el apartamento.'}`,
    choices: [
      {
        text: 'Subir con el cuaderno',
        nextScene: 'confrontacion',
        effects: { cordura: -20, trauma: 15, culpa: 20 },
      },
    ],
  },

  espera: {
    id: 'espera',
    getText: (v) =>
      `Decides esperar. Te sientas en el suelo del pasillo, con la espalda contra la pared.\n\nPasan los minutos. O las horas. El tiempo se vuelve algo elástico e irrelevante.\n\n${v.paranoia > 40 ? 'Las sombras se alargan. Se mueven. Estás seguro de que se mueven, aunque la luz no cambia.' : 'El silencio se profundiza hasta que puedes escuchar el sonido de tu propia sangre circulando.'}\n\nY entonces lo ves.\n\nAl fondo del pasillo. Donde antes no había nada.\n\nUna figura.`,
    choices: [
      {
        text: 'Enfrentarla',
        nextScene: 'figura',
        effects: { miedo: 20 },
      },
    ],
  },

  intentar_dormir: {
    id: 'intentar_dormir',
    getText: (v) =>
      `Vuelves a la cama. Cierras los ojos.\n\nPero el sueño no viene. En su lugar, viene otra cosa. Imágenes detrás de tus párpados: la silla mirándote, la nota, el reloj marcando 3:33, siempre 3:33.\n\n${v.vio_reflejo ? 'Y esa sonrisa. La sonrisa del espejo. Esperando detrás de cada parpadeo.' : ''}\n\n${v.cordura < 60 ? 'La línea entre estar despierto y dormido se difumina. Ya no estás seguro de cuál es cuál.' : 'No puedes dormir. No aquí. No con este silencio.'}\n\nCuando abres los ojos, no estás en la cama.\n\nEstás de pie. En el pasillo. Frente a la puerta principal.\n\nNo recuerdas haberte levantado.`,
    choices: [
      {
        text: 'Aceptar lo que está pasando',
        nextScene: v => v.cordura < 50 ? 'final_olvido' : 'figura',
        effects: { cordura: -15, trauma: 10 },
      },
      {
        text: 'Resistir',
        nextScene: 'decision_crucial_2',
        effects: { miedo: 15, culpa: 10 },
      },
    ],
  },

  decision_crucial_2: {
    id: 'decision_crucial_2',
    getText: (v) =>
      `Estás agotado. El miedo se ha vuelto algo constante, como un zumbido de fondo. Ya no puedes distinguir cuánto tiempo ha pasado.\n\n${v.trauma > 30 ? 'Has visto cosas que no puedes explicar. Cosas que quizá no son reales. Cosas que quizá lo son.' : 'El apartamento se siente como una trampa. Familiar pero hostil.'}\n\nTienes que actuar. Ahora.`,
    choices: [
      {
        text: 'Abrir la puerta principal. Salir de aquí.',
        nextScene: 'abrir_puerta',
        effects: { trauma: 10 },
      },
      {
        text: 'Esperar en silencio',
        nextScene: 'figura',
        effects: { paranoia: 15 },
      },
      {
        text: 'Rendirse',
        nextScene: 'final_olvido',
        condition: (v) => v.cordura < 40,
        effects: { cordura: -20 },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  ACT 4 — CONFRONTACIÓN
  // ═══════════════════════════════════════════

  figura: {
    id: 'figura',
    timeLimit: 5,
    timeoutScene: 'paralisis',
    getText: (v) =>
      v.cordura < 50
        ? `La figura está ahí. Ha estado ahí todo el tiempo, ¿verdad? Quizá desde antes de que despertaras. Quizá desde siempre.\n\nNo tiene rostro. O tiene demasiados rostros. Cambia cada vez que parpadeas — tu cara, la cara de la fotografía, la cara del espejo.\n\nSe mueve. No camina. Se desplaza. Como una sombra que ha aprendido a existir en tres dimensiones.\n\nDice tu nombre.\n\nCon tu voz.`
        : `Al fondo del pasillo hay alguien.\n\nUna silueta. Inmóvil. No puedes distinguir sus rasgos en la penumbra, pero sabes que te está mirando.\n\nNo se mueve. No habla. Solo está ahí, ocupando un espacio que hace un momento estaba vacío.\n\nEl silencio entre los dos es insoportable.`,
    choices: [
      {
        text: 'Enfrentarla. Avanzar.',
        nextScene: 'confrontacion',
        effects: { miedo: 15, trauma: 10 },
      },
      {
        text: 'Huir hacia la puerta principal',
        nextScene: 'huida',
        effects: { miedo: 20 },
        isTimeoutDefault: true,
      },
    ],
  },

  paralisis: {
    id: 'paralisis',
    getText: (v) =>
      `No puedes moverte.\n\nTu cuerpo se niega a responder. El miedo te ha paralizado, clavado al suelo como un insecto en un alfiler.\n\nLa figura avanza. Cada paso que da parece durar una eternidad y un instante al mismo tiempo.\n\nSe acerca.\n\nSe acerca.\n\nEstá frente a ti.\n\nExtiende una mano — tu mano, con tus dedos, con tu cicatriz — y la posa sobre tu rostro.\n\nTodo se vuelve silencio.`,
    choices: [
      {
        text: '...',
        nextScene: 'final_olvido',
        effects: { cordura: -30 },
      },
    ],
  },

  confrontacion: {
    id: 'confrontacion',
    getText: (v) => {
      let text = '';
      if (v.abrio_caja) {
        text = `Avanzas con el cuaderno en la mano. La figura no retrocede.\n\nCuando estás lo suficientemente cerca, la reconoces.\n\nEres tú.\n\nNo como un reflejo. Como otra persona que lleva tu cara. Tiene tus ojos, pero más cansados. Tu boca, pero la línea de los labios es más dura. Como si hubiera vivido años que tú no recuerdas.\n\n"¿Cuántas veces?" — preguntas, levantando el cuaderno.\n\nLa figura — tú — sonríe con una tristeza que te rompe por dentro.\n\n"Las suficientes."`;
      } else if (v.vio_reflejo && v.contesto_telefono) {
        text = `Te acercas a la figura. Con cada paso, se vuelve más clara. Más definida.\n\nEs tu rostro. Tu cuerpo. Pero la expresión es diferente — hay algo detrás de esos ojos que reconoces como tuyos pero que no entiendes.\n\nCompasión. Te mira con compasión.\n\n"Llevas mucho tiempo aquí," dice. Con tu voz. "Más del que crees."\n\n"¿Qué eres?" preguntas.\n\n"La pregunta correcta es: ¿qué eres tú?"`;
      } else {
        text = `La figura te espera. Cuando llegas frente a ella, la penumbra se disipa lo suficiente para ver.\n\nUn rostro. Tu rostro. Pero no exactamente — como una copia imperfecta, como el recuerdo de un recuerdo.\n\n"Has tardado más que las otras veces," dice.\n\nSu voz es la tuya filtrada a través de algo que no puedes identificar. Distancia. Tiempo. Olvido.`;
      }
      return text;
    },
    choices: [
      {
        text: '¿Qué es este lugar?',
        nextScene: v => v.abrio_caja ? 'final_aceptacion' : 'final_silencio',
        effects: { culpa: 10 },
      },
      {
        text: 'No eres real.',
        nextScene: 'final_silencio',
        effects: { paranoia: 15 },
        condition: (v) => v.paranoia > 30,
      },
      {
        text: 'Acepto lo que sea que soy.',
        nextScene: 'final_aceptacion',
        effects: { cordura: -10, culpa: 15 },
        condition: (v) => v.abrio_caja > 0 || v.trauma > 30,
      },
    ],
  },

  huida: {
    id: 'huida',
    getText: (v) =>
      `Corres. Tus pies golpean el suelo del pasillo. La puerta principal está ahí, a metros.\n\n${v.paranoia > 40 ? 'Detrás de ti, el sonido de pasos. Tus pasos. Exactamente tus pasos, como un eco que viene de la dirección equivocada.' : 'No miras atrás. No puedes mirar atrás.'}\n\nLlegas a la puerta. El pomo. El cerrojo.`,
    choices: [
      {
        text: 'Abrir y salir',
        nextScene: 'final_ecos',
        effects: { miedo: 15 },
      },
      {
        text: 'Detenerse. Darse vuelta.',
        nextScene: 'final_silencio',
        effects: { cordura: -15, trauma: 15 },
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  FINALES
  // ═══════════════════════════════════════════

  final_silencio: {
    id: 'final_silencio',
    isEnding: true,
    endingType: 'malo',
    endingTitle: 'El Silencio Permanece',
    getText: (v) =>
      `El silencio te envuelve. No como una ausencia de sonido, sino como una presencia. Una entidad que llena cada espacio, cada grieta, cada pensamiento.\n\nLa figura ya no está. O quizá siempre estuvo y es todo lo demás lo que ha desaparecido.\n\nTe sientas en el suelo. El frío del suelo es lo último que sientes con claridad.\n\nEl apartamento se queda en silencio.\n\nComo siempre ha estado.\n\nComo siempre estará.\n\nEn algún lugar, un reloj marca las 3:33.`,
    choices: [],
  },

  final_ecos: {
    id: 'final_ecos',
    isEnding: true,
    endingType: 'neutro',
    endingTitle: 'Ecos',
    getText: (v) =>
      `Sales. Bajas las escaleras. Cada piso que desciendes se siente como despertar de una capa más de sueño.\n\nLlegas a la calle. El aire frío de la noche te golpea la cara como una bofetada de realidad.\n\nHay farolas. Coches aparcados. El sonido distante de la ciudad.\n\nPero cuando miras hacia atrás, hacia la ventana de tu apartamento en el tercer piso, la luz está encendida.\n\nY hay alguien de pie junto a la ventana.\n\nMirándote.\n\nTe das vuelta y empiezas a caminar. No miras atrás.\n\nPero durante el resto de tu vida, en los momentos de silencio — justo antes de dormir, en una habitación vacía, en una pausa entre palabras — escucharás un eco.\n\nTu nombre. Susurrado por una voz que es casi la tuya.`,
    choices: [],
  },

  final_puerta: {
    id: 'final_puerta',
    isEnding: true,
    endingType: 'perturbador',
    endingTitle: 'Lo Que Hay Detrás',
    getText: (v) =>
      `La oscuridad al otro lado de la puerta se derrama hacia dentro como líquido. No puedes cerrarla. No puedes moverte.\n\nLa oscuridad te toca. Es fría y cálida al mismo tiempo. Familiar. Como un abrazo de alguien que conoces pero no puedes recordar.\n\nY entonces lo entiendes.\n\nNo hay nada al otro lado de la puerta porque no hay otro lado. No hay edificio. No hay ciudad. No hay mundo.\n\nSolo está el apartamento. Y el silencio. Y tú.\n\nO lo que queda de ti.\n\nLa puerta se cierra sola. Estás dentro de nuevo. En el mismo lugar. En la misma noche.\n\nEl reloj marca las 3:33.\n\nAlgo te dice que siempre ha sido así. Que el mundo que recuerdas — la calle, el sol, las otras personas — fue solo un sueño que tuviste una vez.\n\nY ahora estás despierto.`,
    choices: [],
  },

  final_aceptacion: {
    id: 'final_aceptacion',
    isEnding: true,
    endingType: 'ambiguo',
    endingTitle: 'Aceptación',
    getText: (v) =>
      `"¿Cuántas veces hemos hecho esto?" preguntas.\n\nLa figura — tú, el otro tú, el tú que recuerda — te mira con una expresión que está entre la piedad y la admiración.\n\n"Muchas. Cada vez olvidas. Cada vez despiertas. Cada vez eliges."\n\n"¿Y esta vez?"\n\n"Esta vez estás preguntando. Eso es nuevo."\n\nEl silencio entre los dos es diferente ahora. No es amenazante. Es... paciente.\n\n"No puedo salir, ¿verdad?"\n\n"No hay fuera. Nunca lo hubo."\n\nAsientes. La verdad se asienta en tu pecho como una piedra que siempre estuvo ahí pero que recién ahora puedes sentir.\n\n"Pero puedo recordar."\n\nLa figura sonríe. Esta vez, la sonrisa es genuina.\n\n"Sí. Eso sí puedes."\n\nCierras los ojos. Cuando los abres, el apartamento está en silencio. Pero ahora el silencio tiene un significado diferente.\n\nNo es una jaula.\n\nEs un eco.\n\nTu eco.`,
    choices: [],
  },

  final_bucle: {
    id: 'final_bucle',
    isEnding: true,
    endingType: 'perturbador',
    endingTitle: 'El Bucle',
    getText: (v) =>
      `Las puertas del ascensor se cierran.\n\nEl número 3 parpadea en el indicador.\n\nSientes el movimiento — hacia abajo, o eso crees — pero cuando las puertas se abren, estás en el mismo pasillo. Piso 3.\n\nTu puerta está ahí. Entreabierta.\n\nEntras. El apartamento es el mismo. Todo está en su lugar.\n\nHay una nota sobre la mesa de la cocina.\n\nTe acuestas en la cama. Cierras los ojos.\n\n.\n.\n.\n\nAbres los ojos.\n\nEl techo está ahí. Blanco. Familiar.\n\nPero algo ha cambiado.\n\nNo sabes qué.\n\nEl reloj marca las 3:33.\n\nY el silencio espera.`,
    choices: [],
  },

  final_olvido: {
    id: 'final_olvido',
    isEnding: true,
    endingType: 'malo',
    endingTitle: 'Olvidado',
    getText: (v) =>
      `La oscuridad se cierra a tu alrededor como un puño.\n\nIntentas recordar tu nombre. No puedes.\n\nIntentas recordar este lugar. Las paredes se difuminan.\n\nIntentas recordar por qué tenías miedo. El miedo se disuelve, pero lo que lo reemplaza es peor: nada. Una nada absoluta, sin fondo, sin horizonte.\n\nOlvidas la nota. Olvidas la puerta. Olvidas el espejo y el teléfono y las fotografías.\n\nOlvidas que olvidaste.\n\nLo último que se desvanece es una sensación. No un recuerdo. Una sensación:\n\nLa certeza de que alguien — algo — te está observando.\n\nY luego, ni siquiera eso.\n\nSolo silencio.\n\nSolo silencio.\n\n\n\nSolo`,
    choices: [],
  },
};

export const TOTAL_ENDINGS = 6;

export const ENDING_DESCRIPTIONS = {
  final_silencio: {
    title: 'El Silencio Permanece',
    type: 'malo',
    hint: 'Cuando el miedo gana, el silencio se lo queda todo.',
  },
  final_ecos: {
    title: 'Ecos',
    type: 'neutro',
    hint: 'Escapar no significa dejar atrás.',
  },
  final_puerta: {
    title: 'Lo Que Hay Detrás',
    type: 'perturbador',
    hint: 'Algunas puertas no deberían abrirse. Nunca.',
  },
  final_aceptacion: {
    title: 'Aceptación',
    type: 'ambiguo',
    hint: 'La verdad no libera. Pero al menos es real.',
  },
  final_bucle: {
    title: 'El Bucle',
    type: 'perturbador',
    hint: 'El tiempo es un círculo. El olvido es la curva.',
  },
  final_olvido: {
    title: 'Olvidado',
    type: 'malo',
    hint: 'Hay cosas peores que el miedo.',
  },
};
