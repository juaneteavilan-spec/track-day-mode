# Track Day Mode — contexto para Claude

El usuario habla en español; responde en español.

## Qué es
App para el iDrive 7 (MGU) de BMW: tablero de pista en una sola pantalla para un **M240i xDrive G42 2022** (B58, ZF 8HP, Brooklyn Grey). Id de la app: `m240_track_day` (con prefijo, como exige el MGU Store).

El carro tiene turbo híbrido, kit de flex fuel con MHD (etanol), mapas propios, BBK y coilovers. Por eso importan las temperaturas, el etanol, el boost, la HPFP, el AFR y el knock.

## Repositorio
- `apps/m240_track_day/`: la app (`app.json` + `main.js`, gauges `G.*`, `demo.js` como respaldo sin carro).
- `kit/runtime`: kit de [cauliflowermossgrape/idrive7-apps](https://github.com/cauliflowermossgrape/idrive7-apps) (MIT) con **un solo cambio nuestro**: la opción `config.header` (línea `headLook` en `display.js` y el bloque `look`/`stripeW` de `header()` en `gauges.js`). Si se sincroniza el kit con upstream, conservar ese cambio. Última sincronización: 20-nov-2026, upstream `e35c3c1` (trae QR log en Settings, arreglo de `signals.js` y `ctx.onTouch`). Solo se copian los archivos que ya tenemos más los que piden (`qr.js`, `qrlog.js`, `qrlog-dict-1.txt`, `twin_dme.js`); no traemos `kit/localization` ni las herramientas de desarrollo.
- Vista previa en el PC (hay Node, no Python): armar a mano `<stage>/source/javascript/` con la app (`main.js` → `app.js`), `kit/` = `kit/runtime` y `kit/app-spec.json` (id, title, version, screens, settings, config de `app.json`), y correr `node kit/tools/preview.js <stage> <outDir>` desde un clon de upstream. Pinta el tablero en modo demo como PNG.
- `kit/tools`, `kit/platform`, `mgu-repo.json`: lo que el head unit usa para armar la app. No hace falta SDK ni Node en el PC.
- `mhd_poller.js` / `mhd_protocol.js`: lectura del etanol de MHD, tomada de [Perea Performance](https://github.com/alexpereap/pereaperformance-idrive7-apps) (MIT, ver `NOTICE`). Usa el DID dinámico F303 vía UDS 2C solo para la familia de programa B58 gen2 MG1 5D55; si falla, cae al DID 550D del DME.
- `docs/`: hojas de apoyo (rangos de valores y vista previa del tablero en HTML).

## Convenciones de la app
- Solo números: valor grande y debajo el pico o mínimo de la sesión. Sin gráficas.
- Unidades: temperaturas en °C; presión de llantas, de aceite y demás presiones en psi.
- El tema es fijo (M Tricolour). Las alertas del header se limitan a 3 ("+N MORE").
- Etanol por diagnóstico completo (Diag) y todo lo demás por ReadOnlyDiag, serializados en una sola cola.

## Distribución
- El repo es **público** a propósito: Perea Performance lo instala en el carro desde el MGU Store (Settings → Add source → `juaneteavilan-spec/track-day-mode`, rama `main`). No poner aquí nada privado.
- El usuario no instala la app; la instala Perea. Para publicar una versión: subir el número en `app.json`, hacer commit y push a `main`, y avisar a Perea.

## Estado (nov-2026)
- v0.6.0 publicada. En la primera prueba en el carro (12-nov-2026) se leyó todo menos las llantas: faltan los sensores TPMS (4× OEM 36106877937 433 MHz + codificación 2VB). La pantalla estaba en °F; hay que poner Settings → Units → Celsius.
- v0.6.1 (20-nov-2026): solo sincroniza el kit con upstream; la app no cambia. Trae Settings → QR log: el log de la app como códigos QR para fotografiar (se decodifican con `kit/tools/qrlog_decode.py` de upstream).
- Siguiente: Perea actualiza a 0.6.1 y el usuario manda fotos con el motor caliente para validar los rangos.
