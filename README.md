# Track Day Mode

Tablero de pista para el iDrive 7 (MGU) en una sola pantalla: llantas (presión y temperatura con perfiles de objetivo en caliente), temperatura y presión de aceite, refrigerante, caja ZF 8HP, aire de admisión y de carga, combustible, etanol de MHD flex fuel, boost, HPFP, AFR y knock. Pensado para un BMW M240i xDrive G42 (B58).

Todo sobre la app (qué muestra cada dato, colores, ajustes y qué verificar en el carro): [`apps/m240_track_day/README.md`](apps/m240_track_day/README.md).

## Instalar con el MGU Store

1. El carro necesita root SSH y el [MGU Store](https://github.com/robertnisipeanu/mgu-store) con un renderer instalado.
2. En el Store: **Settings → Add source** → `juaneteavilan-spec/track-day-mode`, rama **main**.
3. Instalar **Track Day Mode**. El head unit la arma con el SDK que ya tiene (este repo no trae nada de BMW).

## Qué hay en este repositorio

| Carpeta | Qué es |
| --- | --- |
| `apps/m240_track_day` | La app |
| `kit/runtime` | El kit de apps (señales, diagnóstico, dibujo, fuentes) de [idrive7-apps](https://github.com/cauliflowermossgrape/idrive7-apps), con una opción agregada para el título (`config.header` en `gauges.js` y `display.js`) |
| `kit/tools`, `kit/platform` | Lo que el head unit usa para armar la app (`build.py` y lo que importa) |
| `mgu-repo.json` | Le dice al MGU Store dónde están las apps y cómo armarlas |

## Licencias y créditos

- Kit y app: MIT (`LICENSE`), sobre el kit de [idrive7-apps](https://github.com/cauliflowermossgrape/idrive7-apps) de cauliflowermossgrape.
- Lectura del etanol de MHD (`apps/m240_track_day/mhd_poller.js`, `mhd_protocol.js`): de la app Flex Fuel de [Perea Performance](https://github.com/alexpereap/pereaperformance-idrive7-apps), MIT (`apps/m240_track_day/NOTICE`).
- Fuentes: Ubuntu Font Licence y SIL Open Font License (`kit/runtime/fonts/`).
