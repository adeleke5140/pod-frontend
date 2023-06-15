import localFont from "next/font/local";

export const bespokeStencil = localFont({
  src: [{
    path: './BespokeStencil/BespokeStencil-Variable.ttf',
    style: 'normal',
    weight: '400 500 600 700',
  }, {
    path: './BespokeStencil/BespokeStencil-VariableItalic.ttf',
    style: 'italic',
    weight: '400 500 600 700',
  }],
  variable: '--font-bespoke'
})

export const supremeFont = localFont({
  src: [{
    path: './Supreme/Supreme-Variable.ttf',
    style: 'normal',
    weight: '400 500 600 700',
  }],
  variable: '--font-supreme'
})
