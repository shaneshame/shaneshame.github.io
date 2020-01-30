const DEFAULT_BINDNAME = 'HelloWorld';
const DEFAULT_FILENAME = 'helloworld-cyclebind.cfg';
const IDEAL_CHARS_PER_LINE = 82;
const MAX_CHARS_PER_LINE = 127;
const MIN_ROWS = 10;

const FONT_MIN = 9;
const FONT_MAX = 13;

const EXAMPLE_BIND = `⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⠞⠋⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠉⠳⢄
⢀⢀⢀⢀⢀⢀⢀⢀⣶⠉⢀⢀⢀⣀⣀⣀⣀⢀⢀⢀⢀⢀⢀⣀⣀⣀⣀⡀⢀⢀⠈⣶
⢀⢀⢀⢀⢀⢀⢀⢀⣿⢀⢰⣿⣿⣿⠿⢿⣿⣿⢀⢀⢀⢀⣿⣿⡿⠿⣿⣿⣿⡆⢀⣿
⢀⢀⢀⢀⢀⢀⢀⢀⠉⢶⡈⠛⠻⠿⠶⢾⡿⠉⢀⣶⣶⡀⠉⢿⡷⠶⠿⠟⠛⢁⡰⠉
⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⠁⣀⣰⣦⣉⡁⢀⢀⠘⠛⠛⠃⢀⢀⠈⢉⣰⣦⣀⠈⢳
⢀⢀⢀⢀⢀⢀⣠⠤⠴⣿⡄⠉⠙⠣⣿⡙⠒⣶⠒⣶⠒⠒⣶⠒⢲⣏⠟⠋⠉⢠⡾⠓⠒⠢⣀
⢀⢀⢀⢀⠠⣟⣤⣤⣄⣈⡙⠓⢤⣄⣀⡈⠉⠛⠒⠛⠒⠒⠛⠚⢉⣁⣠⣤⠾⠁⢀⣤⣾⣯⠲⢄⡀
⢀⢀⢀⣠⢼⣿⣿⣿⡿⣿⣿⣦⣬⡙⠻⠿⣿⣟⠛⠛⠛⢛⣿⣿⠿⠿⢋⣉⣠⣼⣿⠿⣻⣿⣷⣬⡿⣀
⢀⡰⣏⣾⣿⣿⣿⣿⡇⣿⣿⣿⣿⡇⠿⠇⣶⣿⠓⠒⠲⢾⡷⠰⠆⣿⣿⣿⣿⡿⠟⢀⣿⣿⣿⣿⣷⣬⠱⣆
⣾⠃⣿⣿⣿⣿⣿⣿⣇⣬⣷⣶⣶⣶⢻⣷⠟⣿⢀⢀⢀⢸⡇⣾⡇⣿⢿⣿⣤⣶⣾⡀⢿⣿⣿⣿⣿⣿⡆⣿
⠙⠢⣍⠻⢿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣰⢞⡃⣿⢀⢀⢀⢸⡇⣛⢣⡟⣼⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⠿⢃⡿
⢀⢀⢀⠙⢦⣄⣿⡇⠻⢿⣿⣿⣿⣿⣿⠸⠃⠿⢶⣶⣶⣾⣃⠟⢰⣿⣿⣿⣿⣿⡿⠋⣸⡿⠿⣯⣥⠞⠁
⢀⢀⢀⢀⢀⠉⠙⠛⠦⣤⣬⣭⣭⣭⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣿⣿⣿⡦⣴⠋⠙⠛⠁
⢀⢀⢀⢀⢀⢀⢀⢰⡏⣾⡟⠃⣼⣿⣿⣿⣿⣿⣿⣟⢿⣿⣿⣿⣿⡇⢸⣿⣿⣿⣷⠉⡆
⢀⢀⢀⢀⢀⢀⢀⡼⣧⣿⠇⣠⣿⣿⣿⣿⣿⣿⡇⣿⣼⢿⣿⣿⣿⡇⠈⣿⣿⣿⣿⣶⢳⡄
⢀⢀⢀⢀⢀⢀⢸⡇⣿⣿⢀⣿⣿⣿⣿⣿⣿⣿⢰⡏⣿⢸⣿⣿⣿⣷⢀⣿⣿⣿⣿⣿⢸⡇
⢀⢀⢀⢀⢀⢀⠈⠳⠶⠶⠶⣿⣿⣿⣿⣿⣿⣿⠞⠁⠻⢾⣿⣿⣿⣿⣤⣤⣿⡿⠶⠶⠞⠃
⢀⢀⢀⢀⢀⡤⠚⠉⠉⠙⠒⠯⣉⠉⣶⢀⢀⢀⢀⢀⢀⢀⢀⣼⠃⠉⠉⠉⣩⠽⠖⠚⠉⠉⠒⠢⣄
⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣀⠤⠔⠒⠊⠉⠉⠉⠉⠉⠉⠉⠉⠑⠒⠢⠤⣀`;

const MOUSE_BUTTON_MAP = {
  /* eslint-disable sort-keys */
  LEFTCLICK: 'MOUSE1',
  RIGHTCLICK: 'MOUSE2',
  MIDDLECLICK: 'MOUSE3',
  BROWSERBACK: 'MOUSE4',
  BROWSERFORWARD: 'MOUSE5',
  /* eslint-enable sort-keys */
};

export {
  DEFAULT_BINDNAME,
  DEFAULT_FILENAME,
  EXAMPLE_BIND,
  FONT_MAX,
  FONT_MIN,
  IDEAL_CHARS_PER_LINE,
  MAX_CHARS_PER_LINE,
  MIN_ROWS,
  MOUSE_BUTTON_MAP,
};
