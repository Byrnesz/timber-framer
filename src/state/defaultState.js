export const DEFAULT_STATE = {
  L: 48,
  W: 24,
  H: 34,
  oc: 16,
  f_top: true,
  f_rack: true,
  f_shelf: false,
  f_cant: false,
  brace: 'diagonal',
  joinery: 'pin',
  base: 'frame',
  nShelf: 2,
  overhang: 12,
  mode: 'wall',
  wall: {
    height: 96,
    oc: 16,
    size: '2x4',
    walls: [
      {
        len: 144,
        from: -1,
        at: 'end',
        dir: 'straight',
        corner: '3stud',
        openings: [
          { kind: 'door', x: 18, w: 36, h: 82, sill: 0 },
          { kind: 'window', x: 96, w: 36, h: 36, sill: 30 }
        ]
      },
      {
        len: 96,
        from: 0,
        at: 'end',
        dir: 'right',
        corner: '3stud',
        openings: []
      }
    ],
    roof: {
      enabled: false,
      type: 'gable',
      pitch: 6,
      overhang: 12,
      rafterSize: '2x6',
      rafterOC: 16,
      shedFlip: false,
      shedShape: 'outline'
    }
  },
  autoSize: true,
  postSize: '4x4',
  beamSize: '2x4',
  joistSize: '2x4',
  braceSize: '2x4'
};
