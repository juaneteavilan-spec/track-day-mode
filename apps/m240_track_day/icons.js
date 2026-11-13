'use strict';
/**
 * icons.js - the tiles' pictograms, in the spirit of BMW's warning lights, drawn with the kit's own shapes
 * (the kit has no image decoder). Each is designed on a 24 x 24 grid and drawn at (x, y) in size s.
 *
 *   draw(cv, name, x, y, s, color, bg)   bg: the colour behind it (for the letter in the ethanol drop)
 *
 * cv needs: roundRect, strokeRoundRect, circle, arc (degrees clockwise from 12 o'clock), line, polyline, quad, fill (any polygon), text.
 * The browser preview (preview/track-day-preview.html) runs this same code through a small canvas adapter.
 */

/** A drop, point up: centre of its round part (cx, cy), radius r. */
function drop(cv, cx, cy, r, c) {
    cv.circle(cx, cy, r, c);
    cv.quad([[cx - r * 0.92, cy - r * 0.38], [cx + r * 0.92, cy - r * 0.38], [cx, cy - r * 2.1], [cx, cy - r * 2.1]], c);
}
/** A thermometer: stem from (cx, top) down, bulb under it. */
function thermometer(cv, k, cx, top, len, c) {
    cv.strokeRoundRect(cx - 3 * k, top, 6 * k, len * k, 3 * k, 2 * k, c);
    cv.circle(cx, top + (len + 3) * k, 4.2 * k, c);
}

const ICONS = {
    // engine oil temperature: thermometer and an oil drop
    oilT(cv, P, k, c) {
        thermometer(cv, k, P(7, 0)[0], P(0, 2)[1], 13, c);
        drop(cv, P(18, 0)[0], P(0, 17)[1], 3.6 * k, c);
    },
    // oil pressure: BMW's oil can
    oilP(cv, P, k, c) {
        cv.roundRect(...P(2, 11), 14 * k, 8 * k, 2 * k, c);
        cv.roundRect(...P(6, 8), 5 * k, 4 * k, 1 * k, c);
        cv.line(...P(15, 13), ...P(22, 9), 2.4 * k, c);
        cv.line(...P(3, 13), ...P(0.5, 10.5), 2.4 * k, c);
        cv.circle(...P(21.5, 15), 1.7 * k, c);
    },
    // coolant: thermometer standing in waves
    coolant(cv, P, k, c) {
        thermometer(cv, k, P(12, 0)[0], P(0, 1)[1], 12, c);
        cv.line(...P(15.5, 5), ...P(18.5, 5), 2 * k, c);
        cv.line(...P(15.5, 9), ...P(18.5, 9), 2 * k, c);
        cv.polyline([P(0.5, 21), P(3, 19), P(5.5, 21), P(7.5, 19.5)], 2 * k, c);
        cv.polyline([P(16.5, 19.5), P(18.5, 21), P(21, 19), P(23.5, 21)], 2 * k, c);
    },
    // gearbox: a gear
    gearbox(cv, P, k, c) {
        const [cx, cy] = P(12, 12);
        cv.arc(cx, cy, 4.2 * k, 7.6 * k, 0, 360, c);
        for (let a = 0; a < 360; a += 45) {
            const r = (a * Math.PI) / 180, s = Math.sin(r), co = -Math.cos(r);
            cv.line(cx + s * 6.5 * k, cy + co * 6.5 * k, cx + s * 10.5 * k, cy + co * 10.5 * k, 3.4 * k, c);
        }
    },
    // intake air: three streams of air
    intake(cv, P, k, c) {
        cv.polyline([P(1, 7), P(15, 7), P(18, 4.5), P(16.5, 2)], 2.2 * k, c);
        cv.line(...P(1, 12), ...P(22, 12), 2.2 * k, c);
        cv.polyline([P(1, 17), P(13, 17), P(16, 19.5), P(14.5, 22)], 2.2 * k, c);
    },
    // charge air: the intercooler's core
    charge(cv, P, k, c) {
        cv.strokeRoundRect(...P(2, 4), 20 * k, 16 * k, 2 * k, 2.2 * k, c);
        for (const x of [7, 12, 17]) cv.line(...P(x, 6.5), ...P(x, 17.5), 1.6 * k, c);
    },
    // fuel temperature: fuel pump with a small thermometer
    fuelT(cv, P, k, c) {
        cv.strokeRoundRect(...P(2, 3), 11 * k, 19 * k, 2 * k, 2.2 * k, c);
        cv.roundRect(...P(4.5, 6), 6 * k, 4 * k, 1 * k, c);
        cv.polyline([P(13, 8), P(16, 8), P(17.5, 10), P(17.5, 14)], 2 * k, c);
        thermometer(cv, k * 0.8, P(20.5, 0)[0], P(0, 10)[1], 8, c);
    },
    // ethanol: a drop with an E
    ethanol(cv, P, k, c, bg) {
        drop(cv, P(12, 0)[0], P(0, 15.5)[1], 7 * k, c);
        cv.text('E', P(12, 0)[0], P(0, 20)[1], 12 * k, bg, { align: 'center', font: 'bold' });
    },
    // boost: a gauge
    boost(cv, P, k, c) {
        const [cx, cy] = P(12, 14);
        cv.arc(cx, cy, 8.6 * k, 11 * k, -125, 125, c);
        cv.line(cx, cy, ...P(17.5, 8.5), 2.6 * k, c);
        cv.circle(cx, cy, 2.4 * k, c);
    },
    // high pressure fuel: a fuel drop with an arrow up
    hpfp(cv, P, k, c) {
        drop(cv, P(8, 0)[0], P(0, 16)[1], 6 * k, c);
        cv.line(...P(19, 22), ...P(19, 7), 2.4 * k, c);
        cv.quad([P(14.5, 9), P(23.5, 9), P(19, 2.5), P(19, 2.5)], c);
    },
    // air-fuel ratio: air beside a fuel drop
    afr(cv, P, k, c) {
        cv.line(...P(1, 8), ...P(10, 8), 2.2 * k, c);
        cv.line(...P(1, 13), ...P(12, 13), 2.2 * k, c);
        cv.line(...P(1, 18), ...P(10, 18), 2.2 * k, c);
        drop(cv, P(18, 0)[0], P(0, 16)[1], 5 * k, c);
    },
    // knock: a lightning bolt
    knock(cv, P, k, c) {
        cv.quad([P(13, 1), P(19, 1), P(12.5, 12.5), P(6, 12.5)], c);
        cv.quad([P(11, 10.5), P(18, 10.5), P(8, 23), P(9.5, 14)], c);
    },
};

/** Draws the named icon in a box of size s at (x, y). Unknown names draw nothing. */
function draw(cv, name, x, y, s, color, bg) {
    const f = ICONS[name];
    if (!f) return;
    const k = s / 24, P = (gx, gy) => [x + gx * k, y + gy * k];
    f(cv, P, k, color, bg);
}


/* ---------- the car: a G42 coupé from above ---------- */

/** Closed Catmull-Rom curve through pts, n points per span: smooth outlines from a few hand-placed points. */
function smooth(pts, n) {
    const out = [], m = pts.length;
    for (let i = 0; i < m; i++) {
        const p0 = pts[(i - 1 + m) % m], p1 = pts[i], p2 = pts[(i + 1) % m], p3 = pts[(i + 2) % m];
        for (let s = 0; s < n; s++) {
            const t = s / n, t2 = t * t, t3 = t2 * t;
            out.push([0, 1].map((j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
                + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
        }
    }
    return out;
}
/** A left-right symmetric outline from its right half (centre front to centre rear, u 0..1 across, v 0..1 along). */
function sym(half) {
    const left = half.slice(1, -1).reverse().map(([u, v]) => [-u, v]);
    return half.concat(left);
}
/** The right half's mirror image, for the parts that come in pairs (lights, creases). */
const mirror = (pts) => pts.map(([u, v]) => [-u, v]);

// right halves, in body units: u = 1 at the widest point (the rear haunches), v = 0 nose to 1 tail
const BODY = [[0, 0], [0.45, 0.003], [0.73, 0.012], [0.87, 0.03], [0.925, 0.065], [0.935, 0.13], [0.94, 0.2], [0.915, 0.28],
    [0.895, 0.36], [0.905, 0.47], [0.95, 0.6], [0.995, 0.7], [1, 0.8], [0.99, 0.89], [0.94, 0.958], [0.72, 0.992], [0.36, 1], [0, 1]];
const GLASS = [[0, 0.33], [0.5, 0.335], [0.68, 0.36], [0.725, 0.41], [0.715, 0.5], [0.69, 0.6], [0.63, 0.69], [0.46, 0.752], [0, 0.76]];
const ROOF = [[0, 0.442], [0.52, 0.446], [0.64, 0.475], [0.65, 0.6], [0.58, 0.646], [0, 0.654]];
const HEADLIGHT = [[0.5, 0.018], [0.78, 0.03], [0.885, 0.058], [0.9, 0.084], [0.82, 0.082], [0.64, 0.058], [0.5, 0.036]];
const TAILLIGHT = [[0.6, 0.99], [0.87, 0.97], [0.955, 0.925], [0.975, 0.895], [0.94, 0.905], [0.85, 0.952], [0.6, 0.976]];
const MIRROR = [[0.86, 0.352], [1.06, 0.36], [1.1, 0.378], [1.06, 0.392], [0.88, 0.39]];
const HAUNCH = [[0.62, 0.58], [0.9, 0.6], [0.97, 0.7], [0.97, 0.8], [0.9, 0.88], [0.66, 0.9], [0.8, 0.8], [0.8, 0.68]];

/**
 * The car from above, in the lines of a G42 coupé: twin kidneys, long hood with its creases, a glasshouse set
 * back over the rear axle, wide rear haunches, L-shaped tail lights. Centre cx, from `top` down, bw wide (at the
 * haunches) and bh long; the wheels go outside it (carTyres).
 * col = { edge, body, hi, glass, roof, line, light, tail, grille } - edge is the body's darker rim.
 */
function car(cv, cx, top, bw, bh, col) {
    const hw = bw / 2, X = (u) => cx + u * hw, Y = (v) => top + v * bh;
    const at = (pts, n) => smooth(pts, n || 6).map(([u, v]) => [X(u), Y(v)]);
    const line = (a, b, w, c) => cv.line(X(a[0]), Y(a[1]), X(b[0]), Y(b[1]), w, c);
    // the body: a darker rim, the panels inside it a little narrower (the edges roll away from the light)
    cv.fill(at(sym(BODY), 8), col.edge);
    cv.fill(at(sym(BODY).map(([u, v]) => [u * 0.93, 0.008 + v * 0.984]), 8), col.body);
    // the rear haunches catch the light
    cv.fill(at(HAUNCH), col.hi); cv.fill(at(mirror(HAUNCH)), col.hi);
    // the hood: a lighter band down its middle, the two creases either side of the power dome
    cv.fill(at(sym([[0, 0.05], [0.26, 0.06], [0.3, 0.2], [0.34, 0.31], [0, 0.315]]), 4), col.hi);
    for (const s of [1, -1]) {
        cv.polyline([[0.2 * s, 0.05], [0.26 * s, 0.17], [0.31 * s, 0.3]].map(([u, v]) => [X(u), Y(v)]), 1.6, col.line);
        line([0.6 * s, 0.1], [0.7 * s, 0.3], 1.2, col.line);
    }
    // kidneys
    cv.roundRect(X(-0.27), Y(0.004), 0.22 * hw, 0.026 * bh, 3, col.grille);
    cv.roundRect(X(0.05), Y(0.004), 0.22 * hw, 0.026 * bh, 3, col.grille);
    // headlights
    cv.fill(at(HEADLIGHT, 4), col.light); cv.fill(at(mirror(HEADLIGHT), 4), col.light);
    // mirrors
    cv.fill(at(MIRROR, 4), col.edge); cv.fill(at(mirror(MIRROR), 4), col.edge);
    // glasshouse: the glass, the roof panel on it, a reflection across the windscreen
    cv.fill(at(sym(GLASS), 6), col.glass);
    cv.fill(at(sym(ROOF), 6), col.roof);
    cv.fill([[X(-0.5), Y(0.4)], [X(-0.2), Y(0.33)], [X(-0.02), Y(0.33)], [X(-0.34), Y(0.41)]], col.hi);
    // boot: its shut line and the spoiler lip, the tail lights
    line([-0.5, 0.79], [0.5, 0.79], 1.2, col.line);
    cv.polyline([[-0.62, 0.952], [-0.3, 0.964], [0, 0.967], [0.3, 0.964], [0.62, 0.952]].map(([u, v]) => [X(u), Y(v)]), 1.6, col.line);
    cv.fill(at(TAILLIGHT, 4), col.tail); cv.fill(at(mirror(TAILLIGHT), 4), col.tail);
}

/** Where the four wheels sit, just outside the body drawn by car(): { FL, FR, RL, RR: { x, y, w, h } }. */
function carTyres(cx, top, bw, bh) {
    const w = Math.round(bw * 0.18), h = Math.round(bh * 0.18), gap = 8, L = cx - bw / 2 - gap - w, R = cx + bw / 2 + gap;
    const yf = Math.round(top + bh * 0.175 - h / 2), yr = Math.round(top + bh * 0.765 - h / 2);
    return { FL: { x: L, y: yf, w, h }, FR: { x: R, y: yf, w, h }, RL: { x: L, y: yr, w, h }, RR: { x: R, y: yr, w, h } };
}

/** A tyre seen from above: a rounded block in its colour with a few tread grooves across it. */
function tyre(cv, x, y, w, h, color, groove) {
    cv.roundRect(x, y, w, h, Math.min(7, w / 3), color);
    for (let i = 1; i <= 3; i++) {
        const yy = y + h * i / 4;
        cv.line(x + w * 0.28, yy, x + w * 0.72, yy, 1.6, groove);
    }
}

module.exports = { draw, car, carTyres, tyre, names: Object.keys(ICONS) };
