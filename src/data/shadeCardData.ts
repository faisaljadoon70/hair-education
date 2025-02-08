import { HairShade, ShadeCardSeries } from '../types/shadeCard';

// Natural Series
const naturalSeries: HairShade[] = [
  {
    id: '1.0',
    level: 1,
    primaryTone: 0,
    name: 'Natural Black',
    description: 'Pure natural black',
    hexColor: '#0F0F0F',
    rgbColor: { r: 15, g: 15, b: 15 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Natural',
    isHighLift: false,
    formulation: {
      baseColor: '1/0',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.1',
    level: 1,
    primaryTone: 1,
    name: 'Blue Black',
    description: 'Black with Blue Undertone',
    hexColor: '#0A0A14',
    rgbColor: { r: 10, g: 10, b: 20 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Blue',
    isHighLift: false,
    formulation: {
      baseColor: '1/1',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.2',
    level: 1,
    primaryTone: 2,
    name: 'Violet Black',
    description: 'Black with Violet Undertone',
    hexColor: '#0F0A14',
    rgbColor: { r: 15, g: 10, b: 20 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Violet',
    isHighLift: false,
    formulation: {
      baseColor: '1/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.3',
    level: 1,
    primaryTone: 3,
    name: 'Ash Black',
    description: 'Black with Ash Undertone',
    hexColor: '#141414',
    rgbColor: { r: 20, g: 20, b: 20 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '1/3',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.4',
    level: 1,
    primaryTone: 4,
    name: 'Neutral Black',
    description: 'Black with Neutral Undertone',
    hexColor: '#191919',
    rgbColor: { r: 25, g: 25, b: 25 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Neutral',
    isHighLift: false,
    formulation: {
      baseColor: '1/4',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.5',
    level: 1,
    primaryTone: 5,
    name: 'Warm Black',
    description: 'Black with Warm Undertone',
    hexColor: '#1E1914',
    rgbColor: { r: 30, g: 25, b: 20 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Warm',
    isHighLift: false,
    formulation: {
      baseColor: '1/5',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.6',
    level: 1,
    primaryTone: 6,
    name: 'Red Black',
    description: 'Black with Red Undertone',
    hexColor: '#231414',
    rgbColor: { r: 35, g: 20, b: 20 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Red',
    isHighLift: false,
    formulation: {
      baseColor: '1/6',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.7',
    level: 1,
    primaryTone: 7,
    name: 'Mahogany Black',
    description: 'Black with Mahogany Undertone',
    hexColor: '#281919',
    rgbColor: { r: 40, g: 25, b: 25 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Mahogany',
    isHighLift: false,
    formulation: {
      baseColor: '1/7',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.8',
    level: 1,
    primaryTone: 8,
    name: 'Gold Black',
    description: 'Black with Gold Undertone',
    hexColor: '#231E14',
    rgbColor: { r: 35, g: 30, b: 20 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Gold',
    isHighLift: false,
    formulation: {
      baseColor: '1/8',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.9',
    level: 1,
    primaryTone: 9,
    name: 'Beige Black',
    description: 'Black with Beige Undertone',
    hexColor: '#28231E',
    rgbColor: { r: 40, g: 35, b: 30 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Beige',
    isHighLift: false,
    formulation: {
      baseColor: '1/9',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.10',
    level: 1,
    primaryTone: 10,
    name: 'Copper Black',
    description: 'Black with Copper Undertone',
    hexColor: '#2D1E19',
    rgbColor: { r: 45, g: 30, b: 25 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Copper',
    isHighLift: false,
    formulation: {
      baseColor: '1/10',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.11',
    level: 1,
    primaryTone: 11,
    name: 'Chocolate Black',
    description: 'Black with Chocolate Undertone',
    hexColor: '#32231E',
    rgbColor: { r: 50, g: 35, b: 30 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Chocolate',
    isHighLift: false,
    formulation: {
      baseColor: '1/11',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.12',
    level: 1,
    primaryTone: 12,
    name: 'Mocha Black',
    description: 'Black with Mocha Undertone',
    hexColor: '#372823',
    rgbColor: { r: 55, g: 40, b: 35 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Mocha',
    isHighLift: false,
    formulation: {
      baseColor: '1/12',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '1.13',
    level: 1,
    primaryTone: 13,
    name: 'Darkest Brown',
    description: 'Black with Ash Brown Undertone',
    hexColor: '#3C3232',
    rgbColor: { r: 60, g: 50, b: 50 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Ash Brown',
    isHighLift: false,
    formulation: {
      baseColor: '1/13',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.0',
    level: 2,
    primaryTone: 0,
    name: 'Natural Darkest Brown',
    description: 'Natural Darkest Brown',
    hexColor: '#1E1914',
    rgbColor: { r: 30, g: 25, b: 20 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Natural',
    isHighLift: false,
    formulation: {
      baseColor: '2/0',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.1',
    level: 2,
    primaryTone: 1,
    name: 'Blue Darkest Brown',
    description: 'Darkest Brown with Blue Undertone',
    hexColor: '#19141E',
    rgbColor: { r: 25, g: 20, b: 30 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Blue',
    isHighLift: false,
    formulation: {
      baseColor: '2/1',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.2',
    level: 2,
    primaryTone: 2,
    name: 'Violet Darkest Brown',
    description: 'Darkest Brown with Violet Undertone',
    hexColor: '#1E1423',
    rgbColor: { r: 30, g: 20, b: 35 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Violet',
    isHighLift: false,
    formulation: {
      baseColor: '2/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.3',
    level: 2,
    primaryTone: 3,
    name: 'Ash Darkest Brown',
    description: 'Darkest Brown with Ash Undertone',
    hexColor: '#231E1E',
    rgbColor: { r: 35, g: 30, b: 30 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '2/3',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.4',
    level: 2,
    primaryTone: 4,
    name: 'Neutral Darkest Brown',
    description: 'Darkest Brown with Neutral Undertone',
    hexColor: '#282323',
    rgbColor: { r: 40, g: 35, b: 35 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Neutral',
    isHighLift: false,
    formulation: {
      baseColor: '2/4',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.5',
    level: 2,
    primaryTone: 5,
    name: 'Warm Darkest Brown',
    description: 'Darkest Brown with Warm Undertone',
    hexColor: '#2D231E',
    rgbColor: { r: 45, g: 35, b: 30 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Warm',
    isHighLift: false,
    formulation: {
      baseColor: '2/5',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.6',
    level: 2,
    primaryTone: 6,
    name: 'Red Darkest Brown',
    description: 'Darkest Brown with Red Undertone',
    hexColor: '#321E1E',
    rgbColor: { r: 50, g: 30, b: 30 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Red',
    isHighLift: false,
    formulation: {
      baseColor: '2/6',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.7',
    level: 2,
    primaryTone: 7,
    name: 'Mahogany Darkest Brown',
    description: 'Darkest Brown with Mahogany Undertone',
    hexColor: '#372323',
    rgbColor: { r: 55, g: 35, b: 35 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Mahogany',
    isHighLift: false,
    formulation: {
      baseColor: '2/7',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.8',
    level: 2,
    primaryTone: 8,
    name: 'Gold Darkest Brown',
    description: 'Darkest Brown with Gold Undertone',
    hexColor: '#32281E',
    rgbColor: { r: 50, g: 40, b: 30 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Gold',
    isHighLift: false,
    formulation: {
      baseColor: '2/8',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.9',
    level: 2,
    primaryTone: 9,
    name: 'Beige Darkest Brown',
    description: 'Darkest Brown with Beige Undertone',
    hexColor: '#372D28',
    rgbColor: { r: 55, g: 45, b: 40 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Beige',
    isHighLift: false,
    formulation: {
      baseColor: '2/9',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.10',
    level: 2,
    primaryTone: 10,
    name: 'Copper Darkest Brown',
    description: 'Darkest Brown with Copper Undertone',
    hexColor: '#3C2823',
    rgbColor: { r: 60, g: 40, b: 35 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Copper',
    isHighLift: false,
    formulation: {
      baseColor: '2/10',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.11',
    level: 2,
    primaryTone: 11,
    name: 'Chocolate Darkest Brown',
    description: 'Darkest Brown with Chocolate Undertone',
    hexColor: '#412D28',
    rgbColor: { r: 65, g: 45, b: 40 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Chocolate',
    isHighLift: false,
    formulation: {
      baseColor: '2/11',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.12',
    level: 2,
    primaryTone: 12,
    name: 'Mocha Darkest Brown',
    description: 'Darkest Brown with Mocha Undertone',
    hexColor: '#46332D',
    rgbColor: { r: 70, g: 51, b: 45 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Mocha',
    isHighLift: false,
    formulation: {
      baseColor: '2/12',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.13',
    level: 2,
    primaryTone: 13,
    name: 'Dark Brown',
    description: 'Dark Brown with Ash Undertone',
    hexColor: '#4B3C3C',
    rgbColor: { r: 75, g: 60, b: 60 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Ash Brown',
    isHighLift: false,
    formulation: {
      baseColor: '2/13',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.0',
    level: 3,
    primaryTone: 0,
    name: 'Natural Dark Brown',
    description: 'Natural Dark Brown',
    hexColor: '#32281E',
    rgbColor: { r: 50, g: 40, b: 30 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Natural',
    isHighLift: false,
    formulation: {
      baseColor: '3/0',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.1',
    level: 3,
    primaryTone: 1,
    name: 'Blue Dark Brown',
    description: 'Dark Brown with Blue Undertone',
    hexColor: '#2D2332',
    rgbColor: { r: 45, g: 35, b: 50 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Blue',
    isHighLift: false,
    formulation: {
      baseColor: '3/1',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.2',
    level: 3,
    primaryTone: 2,
    name: 'Violet Dark Brown',
    description: 'Dark Brown with Violet Undertone',
    hexColor: '#322337',
    rgbColor: { r: 50, g: 35, b: 55 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Violet',
    isHighLift: false,
    formulation: {
      baseColor: '3/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.3',
    level: 3,
    primaryTone: 3,
    name: 'Ash Dark Brown',
    description: 'Dark Brown with Ash Undertone',
    hexColor: '#372D2D',
    rgbColor: { r: 55, g: 45, b: 45 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '3/3',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.4',
    level: 3,
    primaryTone: 4,
    name: 'Neutral Dark Brown',
    description: 'Dark Brown with Neutral Undertone',
    hexColor: '#3C3232',
    rgbColor: { r: 60, g: 50, b: 50 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Neutral',
    isHighLift: false,
    formulation: {
      baseColor: '3/4',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.5',
    level: 3,
    primaryTone: 5,
    name: 'Warm Dark Brown',
    description: 'Dark Brown with Warm Undertone',
    hexColor: '#41322D',
    rgbColor: { r: 65, g: 50, b: 45 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Warm',
    isHighLift: false,
    formulation: {
      baseColor: '3/5',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.6',
    level: 3,
    primaryTone: 6,
    name: 'Red Dark Brown',
    description: 'Dark Brown with Red Undertone',
    hexColor: '#462D2D',
    rgbColor: { r: 70, g: 45, b: 45 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Red',
    isHighLift: false,
    formulation: {
      baseColor: '3/6',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.7',
    level: 3,
    primaryTone: 7,
    name: 'Mahogany Dark Brown',
    description: 'Dark Brown with Mahogany Undertone',
    hexColor: '#4B3232',
    rgbColor: { r: 75, g: 50, b: 50 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Mahogany',
    isHighLift: false,
    formulation: {
      baseColor: '3/7',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.8',
    level: 3,
    primaryTone: 8,
    name: 'Gold Dark Brown',
    description: 'Dark Brown with Gold Undertone',
    hexColor: '#46372D',
    rgbColor: { r: 70, g: 55, b: 45 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Gold',
    isHighLift: false,
    formulation: {
      baseColor: '3/8',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.9',
    level: 3,
    primaryTone: 9,
    name: 'Beige Dark Brown',
    description: 'Dark Brown with Beige Undertone',
    hexColor: '#4B3C37',
    rgbColor: { r: 75, g: 60, b: 55 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Beige',
    isHighLift: false,
    formulation: {
      baseColor: '3/9',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.10',
    level: 3,
    primaryTone: 10,
    name: 'Copper Dark Brown',
    description: 'Dark Brown with Copper Undertone',
    hexColor: '#503732',
    rgbColor: { r: 80, g: 55, b: 50 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Copper',
    isHighLift: false,
    formulation: {
      baseColor: '3/10',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.11',
    level: 3,
    primaryTone: 11,
    name: 'Chocolate Dark Brown',
    description: 'Dark Brown with Chocolate Undertone',
    hexColor: '#553C37',
    rgbColor: { r: 85, g: 60, b: 55 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Chocolate',
    isHighLift: false,
    formulation: {
      baseColor: '3/11',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.12',
    level: 3,
    primaryTone: 12,
    name: 'Medium Brown',
    description: 'Medium Brown with Ash Undertone',
    hexColor: '#5A4646',
    rgbColor: { r: 90, g: 70, b: 70 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '3/12',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.13',
    level: 3,
    primaryTone: 13,
    name: 'Medium Brown Intense',
    description: 'Medium Brown with Intense Ash Undertone',
    hexColor: '#554B4B',
    rgbColor: { r: 85, g: 75, b: 75 },
    series: 'natural',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Intense Ash',
    isHighLift: false,
    formulation: {
      baseColor: '3/13',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.0',
    level: 4,
    primaryTone: 0,
    name: 'Natural Medium Brown',
    description: 'Natural Medium Brown',
    hexColor: '#4B3C32',
    rgbColor: { r: 75, g: 60, b: 50 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Natural',
    isHighLift: false,
    formulation: {
      baseColor: '4/0',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.1',
    level: 4,
    primaryTone: 1,
    name: 'Medium Brown Blue',
    description: 'Medium Brown with Blue Undertone',
    hexColor: '#463741',
    rgbColor: { r: 70, g: 55, b: 65 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Blue',
    isHighLift: false,
    formulation: {
      baseColor: '4/1',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.2',
    level: 4,
    primaryTone: 2,
    name: 'Medium Brown Violet',
    description: 'Medium Brown with Violet Undertone',
    hexColor: '#4B3746',
    rgbColor: { r: 75, g: 55, b: 70 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Violet',
    isHighLift: false,
    formulation: {
      baseColor: '4/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.3',
    level: 4,
    primaryTone: 3,
    name: 'Medium Brown Ash',
    description: 'Medium Brown with Ash Undertone',
    hexColor: '#504141',
    rgbColor: { r: 80, g: 65, b: 65 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '4/3',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.4',
    level: 4,
    primaryTone: 4,
    name: 'Medium Brown Neutral',
    description: 'Medium Brown with Neutral Undertone',
    hexColor: '#554646',
    rgbColor: { r: 85, g: 70, b: 70 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Neutral',
    isHighLift: false,
    formulation: {
      baseColor: '4/4',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.5',
    level: 4,
    primaryTone: 5,
    name: 'Medium Brown Warm',
    description: 'Medium Brown with Warm Undertone',
    hexColor: '#5A4641',
    rgbColor: { r: 90, g: 70, b: 65 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Warm',
    isHighLift: false,
    formulation: {
      baseColor: '4/5',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.6',
    level: 4,
    primaryTone: 6,
    name: 'Medium Brown Red',
    description: 'Medium Brown with Red Undertone',
    hexColor: '#5F4141',
    rgbColor: { r: 95, g: 65, b: 65 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Red',
    isHighLift: false,
    formulation: {
      baseColor: '4/6',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.7',
    level: 4,
    primaryTone: 7,
    name: 'Medium Brown Mahogany',
    description: 'Medium Brown with Mahogany Undertone',
    hexColor: '#644646',
    rgbColor: { r: 100, g: 70, b: 70 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Mahogany',
    isHighLift: false,
    formulation: {
      baseColor: '4/7',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.8',
    level: 4,
    primaryTone: 8,
    name: 'Medium Brown Gold',
    description: 'Medium Brown with Gold Undertone',
    hexColor: '#5F4B41',
    rgbColor: { r: 95, g: 75, b: 65 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Gold',
    isHighLift: false,
    formulation: {
      baseColor: '4/8',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.9',
    level: 4,
    primaryTone: 9,
    name: 'Medium Brown Beige',
    description: 'Medium Brown with Beige Undertone',
    hexColor: '#64504B',
    rgbColor: { r: 100, g: 80, b: 75 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Beige',
    isHighLift: false,
    formulation: {
      baseColor: '4/9',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.10',
    level: 4,
    primaryTone: 10,
    name: 'Medium Brown Copper',
    description: 'Medium Brown with Copper Undertone',
    hexColor: '#694B46',
    rgbColor: { r: 105, g: 75, b: 70 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Copper',
    isHighLift: false,
    formulation: {
      baseColor: '4/10',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.11',
    level: 4,
    primaryTone: 11,
    name: 'Medium Brown Chocolate',
    description: 'Medium Brown with Chocolate Undertone',
    hexColor: '#6E504B',
    rgbColor: { r: 110, g: 80, b: 75 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Chocolate',
    isHighLift: false,
    formulation: {
      baseColor: '4/11',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.12',
    level: 4,
    primaryTone: 12,
    name: 'Light Brown Ash',
    description: 'Light Brown with Ash Undertone',
    hexColor: '#735A5A',
    rgbColor: { r: 115, g: 90, b: 90 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '4/12',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.13',
    level: 4,
    primaryTone: 13,
    name: 'Light Brown Intense Ash',
    description: 'Light Brown with Intense Ash Undertone',
    hexColor: '#6E5F5F',
    rgbColor: { r: 110, g: 95, b: 95 },
    series: 'natural',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Intense Ash',
    isHighLift: false,
    formulation: {
      baseColor: '4/13',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.0',
    level: 5,
    primaryTone: 0,
    name: 'Natural Light Brown',
    description: 'Natural Light Brown',
    hexColor: '#645041',
    rgbColor: { r: 100, g: 80, b: 65 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Natural',
    isHighLift: false,
    formulation: {
      baseColor: '5/0',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.1',
    level: 5,
    primaryTone: 1,
    name: 'Light Brown Blue',
    description: 'Light Brown with Blue Undertone',
    hexColor: '#5F4B50',
    rgbColor: { r: 95, g: 75, b: 80 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Blue',
    isHighLift: false,
    formulation: {
      baseColor: '5/1',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.2',
    level: 5,
    primaryTone: 2,
    name: 'Light Brown Violet',
    description: 'Light Brown with Violet Undertone',
    hexColor: '#644B55',
    rgbColor: { r: 100, g: 75, b: 85 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Violet',
    isHighLift: false,
    formulation: {
      baseColor: '5/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.3',
    level: 5,
    primaryTone: 3,
    name: 'Light Brown Ash',
    description: 'Light Brown with Ash Undertone',
    hexColor: '#695555',
    rgbColor: { r: 105, g: 85, b: 85 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '5/3',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.4',
    level: 5,
    primaryTone: 4,
    name: 'Light Brown Neutral',
    description: 'Light Brown with Neutral Undertone',
    hexColor: '#6E5A5A',
    rgbColor: { r: 110, g: 90, b: 90 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Neutral',
    isHighLift: false,
    formulation: {
      baseColor: '5/4',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.5',
    level: 5,
    primaryTone: 5,
    name: 'Light Brown Warm',
    description: 'Light Brown with Warm Undertone',
    hexColor: '#735A55',
    rgbColor: { r: 115, g: 90, b: 85 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Warm',
    isHighLift: false,
    formulation: {
      baseColor: '5/5',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.6',
    level: 5,
    primaryTone: 6,
    name: 'Light Brown Red',
    description: 'Light Brown with Red Undertone',
    hexColor: '#785555',
    rgbColor: { r: 120, g: 85, b: 85 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Red',
    isHighLift: false,
    formulation: {
      baseColor: '5/6',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.7',
    level: 5,
    primaryTone: 7,
    name: 'Light Brown Mahogany',
    description: 'Light Brown with Mahogany Undertone',
    hexColor: '#7D5A5A',
    rgbColor: { r: 125, g: 90, b: 90 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Mahogany',
    isHighLift: false,
    formulation: {
      baseColor: '5/7',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.8',
    level: 5,
    primaryTone: 8,
    name: 'Light Brown Gold',
    description: 'Light Brown with Gold Undertone',
    hexColor: '#785F55',
    rgbColor: { r: 120, g: 95, b: 85 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Gold',
    isHighLift: false,
    formulation: {
      baseColor: '5/8',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.9',
    level: 5,
    primaryTone: 9,
    name: 'Light Brown Beige',
    description: 'Light Brown with Beige Undertone',
    hexColor: '#7D645F',
    rgbColor: { r: 125, g: 100, b: 95 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Beige',
    isHighLift: false,
    formulation: {
      baseColor: '5/9',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.10',
    level: 5,
    primaryTone: 10,
    name: 'Light Brown Copper',
    description: 'Light Brown with Copper Undertone',
    hexColor: '#825F5A',
    rgbColor: { r: 130, g: 95, b: 90 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Copper',
    isHighLift: false,
    formulation: {
      baseColor: '5/10',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.11',
    level: 5,
    primaryTone: 11,
    name: 'Light Brown Chocolate',
    description: 'Light Brown with Chocolate Undertone',
    hexColor: '#87645F',
    rgbColor: { r: 135, g: 100, b: 95 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Chocolate',
    isHighLift: false,
    formulation: {
      baseColor: '5/11',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.12',
    level: 5,
    primaryTone: 12,
    name: 'Dark Blonde Ash',
    description: 'Dark Blonde with Ash Undertone',
    hexColor: '#8C6E6E',
    rgbColor: { r: 140, g: 110, b: 110 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '5/12',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.13',
    level: 5,
    primaryTone: 13,
    name: 'Dark Blonde Intense Ash',
    description: 'Dark Blonde with Intense Ash Undertone',
    hexColor: '#877373',
    rgbColor: { r: 135, g: 115, b: 115 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Intense Ash',
    isHighLift: false,
    formulation: {
      baseColor: '5/13',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.0',
    level: 6,
    primaryTone: 0,
    name: 'Natural Dark Blonde',
    description: 'Natural Dark Blonde',
    hexColor: '#826450',
    rgbColor: { r: 130, g: 100, b: 80 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Natural',
    isHighLift: false,
    formulation: {
      baseColor: '6/0',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.1',
    level: 6,
    primaryTone: 1,
    name: 'Dark Blonde Blue',
    description: 'Dark Blonde with Blue Undertone',
    hexColor: '#7D5F64',
    rgbColor: { r: 125, g: 95, b: 100 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Blue',
    isHighLift: false,
    formulation: {
      baseColor: '6/1',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.2',
    level: 6,
    primaryTone: 2,
    name: 'Dark Blonde Violet',
    description: 'Dark Blonde with Violet Undertone',
    hexColor: '#825F69',
    rgbColor: { r: 130, g: 95, b: 105 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Violet',
    isHighLift: false,
    formulation: {
      baseColor: '6/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.3',
    level: 6,
    primaryTone: 3,
    name: 'Dark Blonde Ash',
    description: 'Dark Blonde with Ash Undertone',
    hexColor: '#876969',
    rgbColor: { r: 135, g: 105, b: 105 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '6/3',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.4',
    level: 6,
    primaryTone: 4,
    name: 'Dark Blonde Neutral',
    description: 'Dark Blonde with Neutral Undertone',
    hexColor: '#8C6E6E',
    rgbColor: { r: 140, g: 110, b: 110 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Neutral',
    isHighLift: false,
    formulation: {
      baseColor: '6/4',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.5',
    level: 6,
    primaryTone: 5,
    name: 'Dark Blonde Warm',
    description: 'Dark Blonde with Warm Undertone',
    hexColor: '#916E69',
    rgbColor: { r: 145, g: 110, b: 105 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Warm',
    isHighLift: false,
    formulation: {
      baseColor: '6/5',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.6',
    level: 6,
    primaryTone: 6,
    name: 'Dark Blonde Red',
    description: 'Dark Blonde with Red Undertone',
    hexColor: '#966969',
    rgbColor: { r: 150, g: 105, b: 105 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Red',
    isHighLift: false,
    formulation: {
      baseColor: '6/6',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.7',
    level: 6,
    primaryTone: 7,
    name: 'Dark Blonde Mahogany',
    description: 'Dark Blonde with Mahogany Undertone',
    hexColor: '#9B6E6E',
    rgbColor: { r: 155, g: 110, b: 110 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Mahogany',
    isHighLift: false,
    formulation: {
      baseColor: '6/7',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.8',
    level: 6,
    primaryTone: 8,
    name: 'Dark Blonde Gold',
    description: 'Dark Blonde with Gold Undertone',
    hexColor: '#967369',
    rgbColor: { r: 150, g: 115, b: 105 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Gold',
    isHighLift: false,
    formulation: {
      baseColor: '6/8',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.9',
    level: 6,
    primaryTone: 9,
    name: 'Dark Blonde Beige',
    description: 'Dark Blonde with Beige Undertone',
    hexColor: '#9B7873',
    rgbColor: { r: 155, g: 120, b: 115 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Beige',
    isHighLift: false,
    formulation: {
      baseColor: '6/9',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.10',
    level: 6,
    primaryTone: 10,
    name: 'Dark Blonde Copper',
    description: 'Dark Blonde with Copper Undertone',
    hexColor: '#A0736E',
    rgbColor: { r: 160, g: 115, b: 110 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Copper',
    isHighLift: false,
    formulation: {
      baseColor: '6/10',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.11',
    level: 6,
    primaryTone: 11,
    name: 'Dark Blonde Chocolate',
    description: 'Dark Blonde with Chocolate Undertone',
    hexColor: '#A57873',
    rgbColor: { r: 165, g: 120, b: 115 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Chocolate',
    isHighLift: false,
    formulation: {
      baseColor: '6/11',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.12',
    level: 6,
    primaryTone: 12,
    name: 'Medium Blonde Ash',
    description: 'Medium Blonde with Ash Undertone',
    hexColor: '#AA8282',
    rgbColor: { r: 170, g: 130, b: 130 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '6/12',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.13',
    level: 6,
    primaryTone: 13,
    name: 'Medium Blonde Intense Ash',
    description: 'Medium Blonde with Intense Ash Undertone',
    hexColor: '#A58787',
    rgbColor: { r: 165, g: 135, b: 135 },
    series: 'natural',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Intense Ash',
    isHighLift: false,
    formulation: {
      baseColor: '6/13',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.0',
    level: 7,
    primaryTone: 0,
    name: 'Natural Medium Blonde',
    description: 'Natural Medium Blonde',
    hexColor: '#A0785F',
    rgbColor: { r: 160, g: 120, b: 95 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Natural',
    isHighLift: false,
    formulation: {
      baseColor: '7/0',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.1',
    level: 7,
    primaryTone: 1,
    name: 'Medium Blonde Blue',
    description: 'Medium Blonde with Blue Undertone',
    hexColor: '#9B7378',
    rgbColor: { r: 155, g: 115, b: 120 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Blue',
    isHighLift: false,
    formulation: {
      baseColor: '7/1',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.2',
    level: 7,
    primaryTone: 2,
    name: 'Medium Blonde Violet',
    description: 'Medium Blonde with Violet Undertone',
    hexColor: '#A0737D',
    rgbColor: { r: 160, g: 115, b: 125 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Violet',
    isHighLift: false,
    formulation: {
      baseColor: '7/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.3',
    level: 7,
    primaryTone: 3,
    name: 'Medium Blonde Ash',
    description: 'Medium Blonde with Ash Undertone',
    hexColor: '#A57D7D',
    rgbColor: { r: 165, g: 125, b: 125 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '7/3',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.4',
    level: 7,
    primaryTone: 4,
    name: 'Medium Blonde Neutral',
    description: 'Medium Blonde with Neutral Undertone',
    hexColor: '#AA8282',
    rgbColor: { r: 170, g: 130, b: 130 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Neutral',
    isHighLift: false,
    formulation: {
      baseColor: '7/4',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.5',
    level: 7,
    primaryTone: 5,
    name: 'Medium Blonde Warm',
    description: 'Medium Blonde with Warm Undertone',
    hexColor: '#AF827D',
    rgbColor: { r: 175, g: 130, b: 125 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Warm',
    isHighLift: false,
    formulation: {
      baseColor: '7/5',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.6',
    level: 7,
    primaryTone: 6,
    name: 'Medium Blonde Red',
    description: 'Medium Blonde with Red Undertone',
    hexColor: '#B47D7D',
    rgbColor: { r: 180, g: 125, b: 125 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Red',
    isHighLift: false,
    formulation: {
      baseColor: '7/6',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.7',
    level: 7,
    primaryTone: 7,
    name: 'Medium Blonde Mahogany',
    description: 'Medium Blonde with Mahogany Undertone',
    hexColor: '#B98282',
    rgbColor: { r: 185, g: 130, b: 130 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Mahogany',
    isHighLift: false,
    formulation: {
      baseColor: '7/7',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.8',
    level: 7,
    primaryTone: 8,
    name: 'Medium Blonde Gold',
    description: 'Medium Blonde with Gold Undertone',
    hexColor: '#B4877D',
    rgbColor: { r: 180, g: 135, b: 125 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Gold',
    isHighLift: false,
    formulation: {
      baseColor: '7/8',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.9',
    level: 7,
    primaryTone: 9,
    name: 'Medium Blonde Beige',
    description: 'Medium Blonde with Beige Undertone',
    hexColor: '#B98C87',
    rgbColor: { r: 185, g: 140, b: 135 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Beige',
    isHighLift: false,
    formulation: {
      baseColor: '7/9',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.10',
    level: 7,
    primaryTone: 10,
    name: 'Medium Blonde Copper',
    description: 'Medium Blonde with Copper Undertone',
    hexColor: '#BE8782',
    rgbColor: { r: 190, g: 135, b: 130 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Copper',
    isHighLift: false,
    formulation: {
      baseColor: '7/10',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.11',
    level: 7,
    primaryTone: 11,
    name: 'Medium Blonde Chocolate',
    description: 'Medium Blonde with Chocolate Undertone',
    hexColor: '#C38C87',
    rgbColor: { r: 195, g: 140, b: 135 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Chocolate',
    isHighLift: false,
    formulation: {
      baseColor: '7/11',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.12',
    level: 7,
    primaryTone: 12,
    name: 'Light Blonde Ash',
    description: 'Light Blonde with Ash Undertone',
    hexColor: '#C89696',
    rgbColor: { r: 200, g: 150, b: 150 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '7/12',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.13',
    level: 7,
    primaryTone: 13,
    name: 'Light Blonde Intense Ash',
    description: 'Light Blonde with Intense Ash Undertone',
    hexColor: '#C39B9B',
    rgbColor: { r: 195, g: 155, b: 155 },
    series: 'natural',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Intense Ash',
    isHighLift: false,
    formulation: {
      baseColor: '7/13',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '8.0',
    level: 8,
    primaryTone: 0,
    name: 'Light Blonde',
    description: 'Natural light blonde with soft reflect',
    hexColor: '#B17B55',
    rgbColor: { r: 177, g: 123, b: 85 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Neutral',
    isHighLift: false,
    formulation: {
      baseColor: '8/0',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.1',
    level: 8,
    primaryTone: 1,
    name: 'Light Blonde Blue',
    description: 'Light Blonde with Blue Undertone',
    hexColor: '#B9878C',
    rgbColor: { r: 185, g: 135, b: 140 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Blue',
    isHighLift: false,
    formulation: {
      baseColor: '8/1',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.2',
    level: 8,
    primaryTone: 2,
    name: 'Light Blonde Violet',
    description: 'Light Blonde with Violet Undertone',
    hexColor: '#BE8791',
    rgbColor: { r: 190, g: 135, b: 145 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Violet',
    isHighLift: false,
    formulation: {
      baseColor: '8/2',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.3',
    level: 8,
    primaryTone: 3,
    name: 'Light Blonde Ash',
    description: 'Light Blonde with Ash Undertone',
    hexColor: '#C39191',
    rgbColor: { r: 195, g: 145, b: 145 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '8/3',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.4',
    level: 8,
    primaryTone: 4,
    name: 'Light Blonde Neutral',
    description: 'Light Blonde with Neutral Undertone',
    hexColor: '#C89696',
    rgbColor: { r: 200, g: 150, b: 150 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Neutral',
    isHighLift: false,
    formulation: {
      baseColor: '8/4',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.5',
    level: 8,
    primaryTone: 5,
    name: 'Light Blonde Warm',
    description: 'Light Blonde with Warm Undertone',
    hexColor: '#CD9691',
    rgbColor: { r: 205, g: 150, b: 145 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Warm',
    isHighLift: false,
    formulation: {
      baseColor: '8/5',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.6',
    level: 8,
    primaryTone: 6,
    name: 'Light Blonde Red',
    description: 'Light Blonde with Red Undertone',
    hexColor: '#D29191',
    rgbColor: { r: 210, g: 145, b: 145 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Red',
    isHighLift: false,
    formulation: {
      baseColor: '8/6',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.7',
    level: 8,
    primaryTone: 7,
    name: 'Light Blonde Mahogany',
    description: 'Light Blonde with Mahogany Undertone',
    hexColor: '#D79696',
    rgbColor: { r: 215, g: 150, b: 150 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Mahogany',
    isHighLift: false,
    formulation: {
      baseColor: '8/7',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.8',
    level: 8,
    primaryTone: 8,
    name: 'Light Blonde Gold',
    description: 'Light Blonde with Gold Undertone',
    hexColor: '#D29B91',
    rgbColor: { r: 210, g: 155, b: 145 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Gold',
    isHighLift: false,
    formulation: {
      baseColor: '8/8',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.9',
    level: 8,
    primaryTone: 9,
    name: 'Light Blonde Beige',
    description: 'Light Blonde with Beige Undertone',
    hexColor: '#D7A09B',
    rgbColor: { r: 215, g: 160, b: 155 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Beige',
    isHighLift: false,
    formulation: {
      baseColor: '8/9',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.10',
    level: 8,
    primaryTone: 10,
    name: 'Light Blonde Copper',
    description: 'Light Blonde with Copper Undertone',
    hexColor: '#DC9B96',
    rgbColor: { r: 220, g: 155, b: 150 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Copper',
    isHighLift: false,
    formulation: {
      baseColor: '8/10',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.11',
    level: 8,
    primaryTone: 11,
    name: 'Light Blonde Chocolate',
    description: 'Light Blonde with Chocolate Undertone',
    hexColor: '#E1A09B',
    rgbColor: { r: 225, g: 160, b: 155 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Chocolate',
    isHighLift: false,
    formulation: {
      baseColor: '8/11',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.12',
    level: 8,
    primaryTone: 12,
    name: 'Very Light Blonde Ash',
    description: 'Very Light Blonde with Ash Undertone',
    hexColor: '#E6AAAA',
    rgbColor: { r: 230, g: 170, b: 170 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Ash',
    isHighLift: false,
    formulation: {
      baseColor: '8/12',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.13',
    level: 8,
    primaryTone: 13,
    name: 'Very Light Blonde Intense Ash',
    description: 'Very Light Blonde with Intense Ash Undertone',
    hexColor: '#E1AFAF',
    rgbColor: { r: 225, g: 175, b: 175 },
    series: 'natural',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Intense Ash',
    isHighLift: false,
    formulation: {
      baseColor: '8/13',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '9.0',
    level: 9,
    primaryTone: 0,
    name: 'Natural Very Light Blonde',
    description: 'Natural Very Light Blonde',
    hexColor: '#DCAA82',
    rgbColor: { r: 220, g: 170, b: 130 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Natural',
    isHighLift: true,
    formulation: {
      baseColor: '9/0',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.1',
    level: 9,
    primaryTone: 1,
    name: 'Very Light Blonde Blue',
    description: 'Very Light Blonde with Blue Undertone',
    hexColor: '#D7A5AA',
    rgbColor: { r: 215, g: 165, b: 170 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Blue',
    isHighLift: true,
    formulation: {
      baseColor: '9/1',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.2',
    level: 9,
    primaryTone: 2,
    name: 'Very Light Blonde Violet',
    description: 'Very Light Blonde with Violet Undertone',
    hexColor: '#DCA5AF',
    rgbColor: { r: 220, g: 165, b: 175 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Violet',
    isHighLift: true,
    formulation: {
      baseColor: '9/2',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.3',
    level: 9,
    primaryTone: 3,
    name: 'Very Light Blonde Ash',
    description: 'Very Light Blonde with Ash Undertone',
    hexColor: '#E1AFAF',
    rgbColor: { r: 225, g: 175, b: 175 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Ash',
    isHighLift: true,
    formulation: {
      baseColor: '9/3',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.4',
    level: 9,
    primaryTone: 4,
    name: 'Very Light Blonde Neutral',
    description: 'Very Light Blonde with Neutral Undertone',
    hexColor: '#E6B4B4',
    rgbColor: { r: 230, g: 180, b: 180 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Neutral',
    isHighLift: true,
    formulation: {
      baseColor: '9/4',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.5',
    level: 9,
    primaryTone: 5,
    name: 'Very Light Blonde Warm',
    description: 'Very Light Blonde with Warm Undertone',
    hexColor: '#EBB4AF',
    rgbColor: { r: 235, g: 180, b: 175 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Warm',
    isHighLift: true,
    formulation: {
      baseColor: '9/5',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.6',
    level: 9,
    primaryTone: 6,
    name: 'Very Light Blonde Red',
    description: 'Very Light Blonde with Red Undertone',
    hexColor: '#F0AFAF',
    rgbColor: { r: 240, g: 175, b: 175 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Red',
    isHighLift: true,
    formulation: {
      baseColor: '9/6',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.7',
    level: 9,
    primaryTone: 7,
    name: 'Very Light Blonde Mahogany',
    description: 'Very Light Blonde with Mahogany Undertone',
    hexColor: '#F5B4B4',
    rgbColor: { r: 245, g: 180, b: 180 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Mahogany',
    isHighLift: true,
    formulation: {
      baseColor: '9/7',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.8',
    level: 9,
    primaryTone: 8,
    name: 'Very Light Blonde Gold',
    description: 'Very Light Blonde with Gold Undertone',
    hexColor: '#F0B9AF',
    rgbColor: { r: 240, g: 185, b: 175 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Gold',
    isHighLift: true,
    formulation: {
      baseColor: '9/8',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.9',
    level: 9,
    primaryTone: 9,
    name: 'Very Light Blonde Beige',
    description: 'Very Light Blonde with Beige Undertone',
    hexColor: '#F5BEB9',
    rgbColor: { r: 245, g: 190, b: 185 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Beige',
    isHighLift: true,
    formulation: {
      baseColor: '9/9',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.10',
    level: 9,
    primaryTone: 10,
    name: 'Very Light Blonde Copper',
    description: 'Very Light Blonde with Copper Undertone',
    hexColor: '#FAB9B4',
    rgbColor: { r: 250, g: 185, b: 180 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Copper',
    isHighLift: true,
    formulation: {
      baseColor: '9/10',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.11',
    level: 9,
    primaryTone: 11,
    name: 'Very Light Blonde Chocolate',
    description: 'Very Light Blonde with Chocolate Undertone',
    hexColor: '#FFBEB9',
    rgbColor: { r: 255, g: 190, b: 185 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Chocolate',
    isHighLift: true,
    formulation: {
      baseColor: '9/11',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.12',
    level: 9,
    primaryTone: 12,
    name: 'Lightest Blonde Ash',
    description: 'Lightest Blonde with Ash Undertone',
    hexColor: '#FFC8C8',
    rgbColor: { r: 255, g: 200, b: 200 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Ash',
    isHighLift: true,
    formulation: {
      baseColor: '9/12',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '9.13',
    level: 9,
    primaryTone: 13,
    name: 'Lightest Blonde Intense Ash',
    description: 'Lightest Blonde with Intense Ash Undertone',
    hexColor: '#FACDCD',
    rgbColor: { r: 250, g: 205, b: 205 },
    series: 'natural',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Intense Ash',
    isHighLift: true,
    formulation: {
      baseColor: '9/13',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.0',
    level: 10,
    primaryTone: 0,
    name: 'Lightest Blonde',
    description: 'Pure lightest blonde with neutral base',
    hexColor: '#E8C8A3',
    rgbColor: { r: 232, g: 200, b: 163 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Neutral',
    isHighLift: true,
    formulation: {
      baseColor: '10/0',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.1',
    level: 10,
    primaryTone: 1,
    name: 'Lightest Blonde Blue',
    description: 'Lightest Blonde with Blue Undertone',
    hexColor: '#F5C8A3',
    rgbColor: { r: 245, g: 200, b: 163 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Blue',
    isHighLift: true,
    formulation: {
      baseColor: '10/1',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.2',
    level: 10,
    primaryTone: 2,
    name: 'Lightest Blonde Violet',
    description: 'Lightest Blonde with Violet Undertone',
    hexColor: '#F5C3CD',
    rgbColor: { r: 245, g: 195, b: 205 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Violet',
    isHighLift: true,
    formulation: {
      baseColor: '10/2',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.3',
    level: 10,
    primaryTone: 3,
    name: 'Lightest Blonde Ash',
    description: 'Lightest Blonde with Ash Undertone',
    hexColor: '#FACDCD',
    rgbColor: { r: 250, g: 205, b: 205 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Ash',
    isHighLift: true,
    formulation: {
      baseColor: '10/3',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.4',
    level: 10,
    primaryTone: 4,
    name: 'Lightest Blonde Neutral',
    description: 'Lightest Blonde with Neutral Undertone',
    hexColor: '#FFD2D2',
    rgbColor: { r: 255, g: 210, b: 210 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Neutral',
    isHighLift: true,
    formulation: {
      baseColor: '10/4',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.5',
    level: 10,
    primaryTone: 5,
    name: 'Lightest Blonde Warm',
    description: 'Lightest Blonde with Warm Undertone',
    hexColor: '#FFD2CD',
    rgbColor: { r: 255, g: 210, b: 205 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Warm',
    isHighLift: true,
    formulation: {
      baseColor: '10/5',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.6',
    level: 10,
    primaryTone: 6,
    name: 'Lightest Blonde Red',
    description: 'Lightest Blonde with Red Undertone',
    hexColor: '#FFCDCD',
    rgbColor: { r: 255, g: 205, b: 205 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Red',
    isHighLift: true,
    formulation: {
      baseColor: '10/6',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.7',
    level: 10,
    primaryTone: 7,
    name: 'Lightest Blonde Mahogany',
    description: 'Lightest Blonde with Mahogany Undertone',
    hexColor: '#FFD2D2',
    rgbColor: { r: 255, g: 210, b: 210 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Mahogany',
    isHighLift: true,
    formulation: {
      baseColor: '10/7',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.8',
    level: 10,
    primaryTone: 8,
    name: 'Lightest Blonde Gold',
    description: 'Lightest Blonde with Gold Undertone',
    hexColor: '#FFD7CD',
    rgbColor: { r: 255, g: 215, b: 205 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Gold',
    isHighLift: true,
    formulation: {
      baseColor: '10/8',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.9',
    level: 10,
    primaryTone: 9,
    name: 'Lightest Blonde Beige',
    description: 'Lightest Blonde with Beige Undertone',
    hexColor: '#FFDCD7',
    rgbColor: { r: 255, g: 220, b: 215 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Beige',
    isHighLift: true,
    formulation: {
      baseColor: '10/9',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.10',
    level: 10,
    primaryTone: 10,
    name: 'Lightest Blonde Copper',
    description: 'Lightest Blonde with Copper Undertone',
    hexColor: '#FFD7D2',
    rgbColor: { r: 255, g: 215, b: 210 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Copper',
    isHighLift: true,
    formulation: {
      baseColor: '10/10',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.11',
    level: 10,
    primaryTone: 11,
    name: 'Lightest Blonde Chocolate',
    description: 'Lightest Blonde with Chocolate Undertone',
    hexColor: '#FFDCD7',
    rgbColor: { r: 255, g: 220, b: 215 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Chocolate',
    isHighLift: true,
    formulation: {
      baseColor: '10/11',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.12',
    level: 10,
    primaryTone: 12,
    name: 'Lightest Blonde Ash',
    description: 'Lightest Blonde with Ash Undertone',
    hexColor: '#FFE6E6',
    rgbColor: { r: 255, g: 230, b: 230 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Ash',
    isHighLift: true,
    formulation: {
      baseColor: '10/12',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.13',
    level: 10,
    primaryTone: 13,
    name: 'Lightest Blonde Intense Ash',
    description: 'Lightest Blonde with Intense Ash Undertone',
    hexColor: '#FFEBEB',
    rgbColor: { r: 255, g: 235, b: 235 },
    series: 'natural',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Intense Ash',
    isHighLift: true,
    formulation: {
      baseColor: '10/13',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Ash Series
const ashSeries: HairShade[] = [
  {
    id: '4.1',
    level: 4,
    primaryTone: 1,
    name: 'Medium Ash Brown',
    description: 'Cool medium brown with ash reflect',
    hexColor: '#3C2420',
    rgbColor: { r: 60, g: 36, b: 32 },
    series: 'ash',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Cool Brown',
    isHighLift: false,
    formulation: {
      baseColor: '4/1',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.1',
    level: 5,
    primaryTone: 1,
    name: 'Light Ash Brown',
    description: 'Cool light brown with ash undertone',
    hexColor: '#4A342C',
    rgbColor: { r: 74, g: 52, b: 44 },
    series: 'ash',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Cool Beige',
    isHighLift: false,
    formulation: {
      baseColor: '5/1',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.1',
    level: 6,
    primaryTone: 1,
    name: 'Dark Ash Blonde',
    description: 'Cool dark blonde with ash undertone',
    hexColor: '#8b6b5d',
    rgbColor: { r: 139, g: 107, b: 93 },
    series: 'ash',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Cool Beige',
    isHighLift: false,
    formulation: {
      baseColor: '6/1',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.1',
    level: 7,
    primaryTone: 1,
    name: 'Medium Ash Blonde',
    description: 'Cool medium blonde with ash reflect',
    hexColor: '#A08977',
    rgbColor: { r: 160, g: 137, b: 119 },
    series: 'ash',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Cool Beige',
    isHighLift: false,
    formulation: {
      baseColor: '7/1',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '8.1',
    level: 8,
    primaryTone: 1,
    name: 'Light Ash Blonde',
    description: 'Cool light blonde with sophisticated ash tone',
    hexColor: '#B69B8F',
    rgbColor: { r: 182, g: 155, b: 143 },
    series: 'ash',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Cool Pearl',
    isHighLift: false,
    formulation: {
      baseColor: '8/1',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '9.1',
    level: 9,
    primaryTone: 1,
    name: 'Very Light Ash Blonde',
    description: 'Cool very light blonde with ash reflect',
    hexColor: '#D4BFB3',
    rgbColor: { r: 212, g: 191, b: 179 },
    series: 'ash',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Cool Pearl',
    isHighLift: true,
    formulation: {
      baseColor: '9/1',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.1',
    level: 10,
    primaryTone: 1,
    name: 'Lightest Ash Blonde',
    description: 'Ultra-light blonde with pure ash tone',
    hexColor: '#E8D6C7',
    rgbColor: { r: 232, g: 214, b: 199 },
    series: 'ash',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Ice',
    isHighLift: true,
    formulation: {
      baseColor: '10/1',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '4.11',
    level: 4,
    primaryTone: 11,
    name: 'Medium Intense Ash Brown',
    description: 'Cool medium brown with intense ash reflect',
    hexColor: '#3A2422',
    rgbColor: { r: 58, g: 36, b: 34 },
    series: 'ash',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Deep Cool',
    isHighLift: false,
    formulation: {
      baseColor: '4/11',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.11',
    level: 5,
    primaryTone: 11,
    name: 'Light Intense Ash Brown',
    description: 'Cool light brown with intense ash reflect',
    hexColor: '#48322A',
    rgbColor: { r: 72, g: 50, b: 42 },
    series: 'ash',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Deep Cool',
    isHighLift: false,
    formulation: {
      baseColor: '5/11',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  }
];

// Gold Series
const goldSeries: HairShade[] = [
  {
    id: '4.3',
    level: 4,
    primaryTone: 3,
    name: 'Medium Golden Brown',
    description: 'Rich brown with warm golden reflect',
    hexColor: '#3C2416',
    rgbColor: { r: 60, g: 36, b: 22 },
    series: 'gold',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Warm Gold',
    isHighLift: false,
    formulation: {
      baseColor: '4/3',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.3',
    level: 5,
    primaryTone: 3,
    name: 'Light Golden Brown',
    description: 'Rich brown with warm golden reflect',
    hexColor: '#5E4030',
    rgbColor: { r: 94, g: 64, b: 48 },
    series: 'gold',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Warm Gold',
    isHighLift: false,
    formulation: {
      baseColor: '5/3',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.3',
    level: 6,
    primaryTone: 3,
    name: 'Dark Golden Blonde',
    description: 'Dark blonde with rich golden reflect',
    hexColor: '#7E5840',
    rgbColor: { r: 126, g: 88, b: 64 },
    series: 'gold',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Warm Gold',
    isHighLift: false,
    formulation: {
      baseColor: '6/3',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.3',
    level: 7,
    primaryTone: 3,
    name: 'Medium Golden Blonde',
    description: 'Warm medium blonde with golden reflect',
    hexColor: '#b69b8f',
    rgbColor: { r: 182, g: 155, b: 143 },
    series: 'gold',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Warm Gold',
    isHighLift: false,
    formulation: {
      baseColor: '7/3',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '8.3',
    level: 8,
    primaryTone: 3,
    name: 'Light Golden Blonde',
    description: 'Light blonde with warm golden reflect',
    hexColor: '#C4A883',
    rgbColor: { r: 196, g: 168, b: 131 },
    series: 'gold',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Warm Gold',
    isHighLift: false,
    formulation: {
      baseColor: '8/3',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '9.3',
    level: 9,
    primaryTone: 3,
    name: 'Very Light Golden Blonde',
    description: 'Bright blonde with subtle golden warmth',
    hexColor: '#D4B599',
    rgbColor: { r: 212, g: 181, b: 153 },
    series: 'gold',
    coverage: { gray: 80, lifting: 3 },
    undertone: 'Soft Gold',
    isHighLift: true,
    formulation: {
      baseColor: '9/3',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '4.33',
    level: 4,
    primaryTone: 33,
    name: 'Medium Intense Golden Brown',
    description: 'Rich brown with intense golden reflect',
    hexColor: '#3E2614',
    rgbColor: { r: 62, g: 38, b: 20 },
    series: 'gold',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Deep Warm Gold',
    isHighLift: false,
    formulation: {
      baseColor: '4/33',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.33',
    level: 5,
    primaryTone: 33,
    name: 'Light Intense Golden Brown',
    description: 'Rich brown with intense golden reflect',
    hexColor: '#604232',
    rgbColor: { r: 96, g: 66, b: 50 },
    series: 'gold',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Deep Warm Gold',
    isHighLift: false,
    formulation: {
      baseColor: '5/33',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  }
];

// Pearl Series
const pearlSeries: HairShade[] = [
  {
    id: '1.2',
    level: 1,
    primaryTone: 2,
    name: 'Black Pearl',
    description: 'Deep black with iridescent reflect',
    hexColor: '#1B1B1B',
    rgbColor: { r: 27, g: 27, b: 27 },
    series: 'pearl',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Cool Pearl',
    isHighLift: false,
    formulation: {
      baseColor: '1/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '2.2',
    level: 2,
    primaryTone: 2,
    name: 'Darkest Pearl Brown',
    description: 'Deep brown with iridescent reflect',
    hexColor: '#2A1810',
    rgbColor: { r: 42, g: 24, b: 16 },
    series: 'pearl',
    coverage: { gray: 100, lifting: 0 },
    undertone: 'Cool Pearl',
    isHighLift: false,
    formulation: {
      baseColor: '2/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '3.2',
    level: 3,
    primaryTone: 2,
    name: 'Dark Pearl Brown',
    description: 'Dark brown with iridescent reflect',
    hexColor: '#3B2218',
    rgbColor: { r: 59, g: 34, b: 24 },
    series: 'pearl',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Cool Pearl',
    isHighLift: false,
    formulation: {
      baseColor: '3/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '4.2',
    level: 4,
    primaryTone: 2,
    name: 'Medium Pearl Brown',
    description: 'Medium brown with iridescent reflect',
    hexColor: '#4E2F22',
    rgbColor: { r: 78, g: 47, b: 34 },
    series: 'pearl',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Cool Pearl',
    isHighLift: false,
    formulation: {
      baseColor: '4/2',
      developer: [20],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '5.2',
    level: 5,
    primaryTone: 2,
    name: 'Light Pearl Brown',
    description: 'Light brown with iridescent reflect',
    hexColor: '#6B4032',
    rgbColor: { r: 107, g: 64, b: 50 },
    series: 'pearl',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Cool Pearl',
    isHighLift: false,
    formulation: {
      baseColor: '5/2',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.2',
    level: 6,
    primaryTone: 2,
    name: 'Dark Pearl Blonde',
    description: 'Dark blonde with iridescent reflect',
    hexColor: '#8B5942',
    rgbColor: { r: 139, g: 89, b: 66 },
    series: 'pearl',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Cool Pearl',
    isHighLift: false,
    formulation: {
      baseColor: '6/2',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '7.2',
    level: 7,
    primaryTone: 2,
    name: 'Medium Pearl Blonde',
    description: 'Medium blonde with iridescent reflect',
    hexColor: '#B17B55',
    rgbColor: { r: 177, g: 123, b: 85 },
    series: 'pearl',
    coverage: { gray: 100, lifting: 3 },
    undertone: 'Cool Pearl',
    isHighLift: false,
    formulation: {
      baseColor: '7/2',
      developer: [30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '8.2',
    level: 8,
    primaryTone: 2,
    name: 'Light Pearl Blonde',
    description: 'Light blonde with iridescent reflect',
    hexColor: '#D4A57C',
    rgbColor: { r: 212, g: 165, b: 124 },
    series: 'pearl',
    coverage: { gray: 90, lifting: 3 },
    undertone: 'Cool Pearl',
    isHighLift: false,
    formulation: {
      baseColor: '8/2',
      developer: [30, 40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 40, maximum: 50 }
    }
  },
  {
    id: '9.2',
    level: 9,
    primaryTone: 2,
    name: 'Very Light Pearl Blonde',
    description: 'Very light blonde with iridescent reflect',
    hexColor: '#E8C8A3',
    rgbColor: { r: 232, g: 200, b: 163 },
    series: 'pearl',
    coverage: { gray: 80, lifting: 4 },
    undertone: 'Cool Pearl',
    isHighLift: true,
    formulation: {
      baseColor: '9/2',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '10.2',
    level: 10,
    primaryTone: 2,
    name: 'Lightest Pearl Blonde',
    description: 'Lightest blonde with iridescent reflect',
    hexColor: '#F2DCC4',
    rgbColor: { r: 242, g: 220, b: 196 },
    series: 'pearl',
    coverage: { gray: 70, lifting: 4 },
    undertone: 'Cool Pearl',
    isHighLift: true,
    formulation: {
      baseColor: '10/2',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Special Blonde Series
const specialBlondeSeries: HairShade[] = [
  {
    id: '12.0',
    level: 12,
    primaryTone: 0,
    name: 'Special High-Lift Natural Blonde',
    description: 'Ultra-light neutral blonde for maximum lift',
    hexColor: '#f5e6db',
    rgbColor: { r: 245, g: 230, b: 219 },
    series: 'special',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Pale Yellow',
    isHighLift: true,
    formulation: {
      baseColor: '12/0',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 50, maximum: 60 }
    }
  },
  {
    id: '12.1',
    level: 12,
    primaryTone: 1,
    name: 'Special High-Lift Ash Blonde',
    description: 'Ultra-light ash blonde with cool undertone',
    hexColor: '#F7EBE3',
    rgbColor: { r: 247, g: 235, b: 227 },
    series: 'special',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Ice',
    isHighLift: true,
    formulation: {
      baseColor: '12/1',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 50, maximum: 60 }
    }
  },
  {
    id: '12.2',
    level: 12,
    primaryTone: 2,
    name: 'Special High-Lift Pearl Blonde',
    description: 'Ultra-light blonde with iridescent reflect',
    hexColor: '#F9EDE7',
    rgbColor: { r: 249, g: 237, b: 231 },
    series: 'special',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Pearl',
    isHighLift: true,
    formulation: {
      baseColor: '12/2',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 50, maximum: 60 }
    }
  },
  {
    id: '12.3',
    level: 12,
    primaryTone: 3,
    name: 'Special High-Lift Golden Blonde',
    description: 'Ultra-light blonde with warm golden reflect',
    hexColor: '#F5E2D0',
    rgbColor: { r: 245, g: 226, b: 208 },
    series: 'special',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Warm Pearl',
    isHighLift: true,
    formulation: {
      baseColor: '12/3',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 50, maximum: 60 }
    }
  },
  {
    id: '12.6',
    level: 12,
    primaryTone: 6,
    name: 'Special High-Lift Violet Blonde',
    description: 'Ultra-light blonde with violet reflect',
    hexColor: '#F7E9E5',
    rgbColor: { r: 247, g: 233, b: 229 },
    series: 'special',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Cool Violet',
    isHighLift: true,
    formulation: {
      baseColor: '12/6',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 50, maximum: 60 }
    }
  },
  {
    id: '12.11',
    level: 12,
    primaryTone: 11,
    name: 'Special High-Lift Intense Ash Blonde',
    description: 'Ultra-light blonde with intense ash reflect',
    hexColor: '#F7E9E3',
    rgbColor: { r: 247, g: 233, b: 227 },
    series: 'special',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Deep Ice',
    isHighLift: true,
    formulation: {
      baseColor: '12/11',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 50, maximum: 60 }
    }
  },
  {
    id: '12.61',
    level: 12,
    primaryTone: 61,
    name: 'Special High-Lift Violet Ash Blonde',
    description: 'Ultra-light blonde with violet ash reflect',
    hexColor: '#F7E7E5',
    rgbColor: { r: 247, g: 231, b: 229 },
    series: 'special',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Cool Violet Ice',
    isHighLift: true,
    formulation: {
      baseColor: '12/61',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 50, maximum: 60 }
    }
  }
];

// Copper Series
const copperSeries: HairShade[] = [
  {
    id: '4.4',
    level: 4,
    primaryTone: 4,
    name: 'Medium Copper Brown',
    description: 'Rich brown with copper reflect',
    hexColor: '#4C2416',
    rgbColor: { r: 76, g: 36, b: 22 },
    series: 'copper',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Warm Copper',
    isHighLift: false,
    formulation: {
      baseColor: '4/4',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.4',
    level: 6,
    primaryTone: 4,
    name: 'Dark Copper Blonde',
    description: 'Dark blonde with vibrant copper reflect',
    hexColor: '#8E5840',
    rgbColor: { r: 142, g: 88, b: 64 },
    series: 'copper',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Warm Copper',
    isHighLift: false,
    formulation: {
      baseColor: '6/4',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  }
];

// Red Series
const redSeries: HairShade[] = [
  {
    id: '4.6',
    level: 4,
    primaryTone: 6,
    name: 'Medium Red Brown',
    description: 'Rich brown with red reflect',
    hexColor: '#4A2218',
    rgbColor: { r: 74, g: 34, b: 24 },
    series: 'red',
    coverage: { gray: 100, lifting: 1 },
    undertone: 'Warm Red',
    isHighLift: false,
    formulation: {
      baseColor: '4/6',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  },
  {
    id: '6.6',
    level: 6,
    primaryTone: 6,
    name: 'Dark Red Blonde',
    description: 'Dark blonde with vibrant red reflect',
    hexColor: '#8C5242',
    rgbColor: { r: 140, g: 82, b: 66 },
    series: 'red',
    coverage: { gray: 100, lifting: 2 },
    undertone: 'Warm Red',
    isHighLift: false,
    formulation: {
      baseColor: '6/6',
      developer: [20, 30],
      mixing: { colorRatio: 1, developerRatio: 1.5 },
      processingTime: { minimum: 35, maximum: 45 }
    }
  }
];

// Blue Series
const blueSeries: HairShade[] = [
  {
    id: '0.1B',
    level: 0,
    primaryTone: 1,
    name: 'Deep Ocean Blue',
    description: 'Intense deep blue for dramatic results',
    hexColor: '#0B2540',
    rgbColor: { r: 11, g: 37, b: 64 },
    series: 'blue',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Deep Blue',
    isHighLift: true,
    formulation: {
      baseColor: '0/1B',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.2B',
    level: 0,
    primaryTone: 2,
    name: 'Electric Blue',
    description: 'Vibrant electric blue for bold statements',
    hexColor: '#0047AB',
    rgbColor: { r: 0, g: 71, b: 171 },
    series: 'blue',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Bright Blue',
    isHighLift: true,
    formulation: {
      baseColor: '0/2B',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.3B',
    level: 0,
    primaryTone: 3,
    name: 'Pastel Blue',
    description: 'Soft pastel blue for ethereal results',
    hexColor: '#89CFF0',
    rgbColor: { r: 137, g: 207, b: 240 },
    series: 'blue',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Soft Blue',
    isHighLift: true,
    formulation: {
      baseColor: '0/3B',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Green Series
const greenSeries: HairShade[] = [
  {
    id: '0.1G',
    level: 0,
    primaryTone: 1,
    name: 'Deep Forest Green',
    description: 'Rich deep green for dramatic results',
    hexColor: '#004B23',
    rgbColor: { r: 0, g: 75, b: 35 },
    series: 'green',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Deep Green',
    isHighLift: true,
    formulation: {
      baseColor: '0/1G',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.2G',
    level: 0,
    primaryTone: 2,
    name: 'Electric Green',
    description: 'Vibrant electric green for bold statements',
    hexColor: '#00FF00',
    rgbColor: { r: 0, g: 255, b: 0 },
    series: 'green',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Bright Green',
    isHighLift: true,
    formulation: {
      baseColor: '0/2G',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.3G',
    level: 0,
    primaryTone: 3,
    name: 'Pastel Mint Green',
    description: 'Soft pastel mint for ethereal results',
    hexColor: '#98FF98',
    rgbColor: { r: 152, g: 255, b: 152 },
    series: 'green',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Soft Mint',
    isHighLift: true,
    formulation: {
      baseColor: '0/3G',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Purple Series
const purpleSeries: HairShade[] = [
  {
    id: '0.1P',
    level: 0,
    primaryTone: 1,
    name: 'Deep Purple',
    description: 'Rich deep purple for dramatic results',
    hexColor: '#301934',
    rgbColor: { r: 48, g: 25, b: 52 },
    series: 'purple',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Deep Purple',
    isHighLift: true,
    formulation: {
      baseColor: '0/1P',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.2P',
    level: 0,
    primaryTone: 2,
    name: 'Electric Purple',
    description: 'Vibrant electric purple for bold statements',
    hexColor: '#9370DB',
    rgbColor: { r: 147, g: 112, b: 219 },
    series: 'purple',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Bright Purple',
    isHighLift: true,
    formulation: {
      baseColor: '0/2P',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.3P',
    level: 0,
    primaryTone: 3,
    name: 'Pastel Lavender',
    description: 'Soft pastel lavender for ethereal results',
    hexColor: '#E6E6FA',
    rgbColor: { r: 230, g: 230, b: 250 },
    series: 'purple',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Soft Lavender',
    isHighLift: true,
    formulation: {
      baseColor: '0/3P',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Pink Series
const pinkSeries: HairShade[] = [
  {
    id: '0.1K',
    level: 0,
    primaryTone: 1,
    name: 'Deep Pink',
    description: 'Rich deep pink for dramatic results',
    hexColor: '#FF1493',
    rgbColor: { r: 255, g: 20, b: 147 },
    series: 'pink',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Deep Pink',
    isHighLift: true,
    formulation: {
      baseColor: '0/1K',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.2K',
    level: 0,
    primaryTone: 2,
    name: 'Hot Pink',
    description: 'Vibrant hot pink for bold statements',
    hexColor: '#FF69B4',
    rgbColor: { r: 255, g: 105, b: 180 },
    series: 'pink',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Bright Pink',
    isHighLift: true,
    formulation: {
      baseColor: '0/2K',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.3K',
    level: 0,
    primaryTone: 3,
    name: 'Pastel Pink',
    description: 'Soft pastel pink for ethereal results',
    hexColor: '#FFB6C1',
    rgbColor: { r: 255, g: 182, b: 193 },
    series: 'pink',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Soft Pink',
    isHighLift: true,
    formulation: {
      baseColor: '0/3K',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Teal Series
const tealSeries: HairShade[] = [
  {
    id: '0.1T',
    level: 0,
    primaryTone: 1,
    name: 'Deep Teal',
    description: 'Rich deep teal for dramatic results',
    hexColor: '#004D4D',
    rgbColor: { r: 0, g: 77, b: 77 },
    series: 'teal',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Deep Teal',
    isHighLift: true,
    formulation: {
      baseColor: '0/1T',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.2T',
    level: 0,
    primaryTone: 2,
    name: 'Electric Teal',
    description: 'Vibrant electric teal for bold statements',
    hexColor: '#008080',
    rgbColor: { r: 0, g: 128, b: 128 },
    series: 'teal',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Bright Teal',
    isHighLift: true,
    formulation: {
      baseColor: '0/2T',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: '0.3T',
    level: 0,
    primaryTone: 3,
    name: 'Pastel Teal',
    description: 'Soft pastel teal for ethereal results',
    hexColor: '#B2D8D8',
    rgbColor: { r: 178, g: 216, b: 216 },
    series: 'teal',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Soft Teal',
    isHighLift: true,
    formulation: {
      baseColor: '0/3T',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Neon Series
const neonSeries: HairShade[] = [
  {
    id: 'N.1Y',
    level: 0,
    primaryTone: 1,
    name: 'Neon Yellow',
    description: 'Ultra-bright neon yellow for electric results',
    hexColor: '#FFFF00',
    rgbColor: { r: 255, g: 255, b: 0 },
    series: 'neon',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Pure Yellow',
    isHighLift: true,
    formulation: {
      baseColor: 'N/1Y',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: 'N.1O',
    level: 0,
    primaryTone: 1,
    name: 'Neon Orange',
    description: 'Ultra-bright neon orange for electric results',
    hexColor: '#FF6700',
    rgbColor: { r: 255, g: 103, b: 0 },
    series: 'neon',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Pure Orange',
    isHighLift: true,
    formulation: {
      baseColor: 'N/1O',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: 'N.1G',
    level: 0,
    primaryTone: 1,
    name: 'Neon Green',
    description: 'Ultra-bright neon green for electric results',
    hexColor: '#39FF14',
    rgbColor: { r: 57, g: 255, b: 20 },
    series: 'neon',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Pure Green',
    isHighLift: true,
    formulation: {
      baseColor: 'N/1G',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Metallic Series
const metallicSeries: HairShade[] = [
  {
    id: 'M.1S',
    level: 0,
    primaryTone: 1,
    name: 'Silver Chrome',
    description: 'Metallic silver with chrome finish',
    hexColor: '#C0C0C0',
    rgbColor: { r: 192, g: 192, b: 192 },
    series: 'metallic',
    coverage: { gray: 100, lifting: 5 },
    undertone: 'Cool Metallic',
    isHighLift: true,
    formulation: {
      baseColor: 'M/1S',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: 'M.1G',
    level: 0,
    primaryTone: 1,
    name: 'Gunmetal Gray',
    description: 'Deep metallic gray with steel finish',
    hexColor: '#2C3539',
    rgbColor: { r: 44, g: 53, b: 57 },
    series: 'metallic',
    coverage: { gray: 100, lifting: 5 },
    undertone: 'Deep Metallic',
    isHighLift: true,
    formulation: {
      baseColor: 'M/1G',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: 'M.1R',
    level: 0,
    primaryTone: 1,
    name: 'Rose Gold',
    description: 'Metallic pink with golden undertones',
    hexColor: '#B76E79',
    rgbColor: { r: 183, g: 110, b: 121 },
    series: 'metallic',
    coverage: { gray: 100, lifting: 5 },
    undertone: 'Warm Metallic',
    isHighLift: true,
    formulation: {
      baseColor: 'M/1R',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Duo-Chrome Series
const duoChromeSeries: HairShade[] = [
  {
    id: 'D.1BP',
    level: 0,
    primaryTone: 1,
    name: 'Blue-Purple Shift',
    description: 'Color-shifting blue to purple',
    hexColor: '#4B0082',
    rgbColor: { r: 75, g: 0, b: 130 },
    series: 'duochrome',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Dual Tone',
    isHighLift: true,
    formulation: {
      baseColor: 'D/1BP',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: 'D.1GT',
    level: 0,
    primaryTone: 1,
    name: 'Green-Teal Shift',
    description: 'Color-shifting green to teal',
    hexColor: '#008080',
    rgbColor: { r: 0, g: 128, b: 128 },
    series: 'duochrome',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Dual Tone',
    isHighLift: true,
    formulation: {
      baseColor: 'D/1GT',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Holographic Series
const holographicSeries: HairShade[] = [
  {
    id: 'H.1O',
    level: 0,
    primaryTone: 1,
    name: 'Opal Shine',
    description: 'Multi-dimensional opal with rainbow reflects',
    hexColor: '#E6E6FA',
    rgbColor: { r: 230, g: 230, b: 250 },
    series: 'holographic',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Multi-Tonal',
    isHighLift: true,
    formulation: {
      baseColor: 'H/1O',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: 'H.1P',
    level: 0,
    primaryTone: 1,
    name: 'Pearl Prism',
    description: 'Multi-dimensional pearl with prismatic reflects',
    hexColor: '#F0EAD6',
    rgbColor: { r: 240, g: 234, b: 214 },
    series: 'holographic',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Multi-Tonal',
    isHighLift: true,
    formulation: {
      baseColor: 'H/1P',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

// Mixed Tone Series
const mixedToneSeries: HairShade[] = [
  {
    id: 'X.1BV',
    level: 0,
    primaryTone: 1,
    name: 'Blue Violet',
    description: 'Rich blend of blue and violet tones',
    hexColor: '#8A2BE2',
    rgbColor: { r: 138, g: 43, b: 226 },
    series: 'mixed',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Cool Blend',
    isHighLift: true,
    formulation: {
      baseColor: 'X/1BV',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: 'X.1RV',
    level: 0,
    primaryTone: 1,
    name: 'Red Violet',
    description: 'Rich blend of red and violet tones',
    hexColor: '#C71585',
    rgbColor: { r: 199, g: 21, b: 133 },
    series: 'mixed',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Warm Blend',
    isHighLift: true,
    formulation: {
      baseColor: 'X/1RV',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  },
  {
    id: 'X.1GB',
    level: 0,
    primaryTone: 1,
    name: 'Green Blue',
    description: 'Rich blend of green and blue tones',
    hexColor: '#0D98BA',
    rgbColor: { r: 13, g: 152, b: 186 },
    series: 'mixed',
    coverage: { gray: 0, lifting: 5 },
    undertone: 'Cool Blend',
    isHighLift: true,
    formulation: {
      baseColor: 'X/1GB',
      developer: [40],
      mixing: { colorRatio: 1, developerRatio: 2 },
      processingTime: { minimum: 45, maximum: 55 }
    }
  }
];

export const SHADE_CARD_SERIES: ShadeCardSeries[] = [
  {
    id: 'natural',
    name: 'Natural Series',
    description: 'Pure, balanced shades for natural-looking results',
    shades: naturalSeries
  },
  {
    id: 'ash',
    name: 'Ash Series',
    description: 'Cool, sophisticated tones to neutralize warmth',
    shades: ashSeries
  },
  {
    id: 'gold',
    name: 'Gold Series',
    description: 'Warm, rich tones for vibrant results',
    shades: goldSeries
  },
  {
    id: 'copper',
    name: 'Copper Series',
    description: 'Vibrant copper tones for warm, rich results',
    shades: copperSeries
  },
  {
    id: 'red',
    name: 'Red Series',
    description: 'Intense red tones for bold, vibrant results',
    shades: redSeries
  },
  {
    id: 'blue',
    name: 'Blue Series',
    description: 'Creative blue tones from deep ocean to pastel sky',
    shades: blueSeries
  },
  {
    id: 'green',
    name: 'Green Series',
    description: 'Creative green tones from forest to mint',
    shades: greenSeries
  },
  {
    id: 'purple',
    name: 'Purple Series',
    description: 'Creative purple tones from deep violet to soft lavender',
    shades: purpleSeries
  },
  {
    id: 'pink',
    name: 'Pink Series',
    description: 'Creative pink tones from hot pink to soft rose',
    shades: pinkSeries
  },
  {
    id: 'teal',
    name: 'Teal Series',
    description: 'Creative teal tones blending blue and green',
    shades: tealSeries
  },
  {
    id: 'special',
    name: 'Special Blonde Series',
    description: 'Maximum lift for ultra-light blonde results',
    shades: specialBlondeSeries
  },
  {
    id: 'neon',
    name: 'Neon Series',
    description: 'Ultra-bright neon shades for electric results',
    shades: neonSeries
  },
  {
    id: 'metallic',
    name: 'Metallic Series',
    description: 'Reflective metallic tones with chrome finish',
    shades: metallicSeries
  },
  {
    id: 'duochrome',
    name: 'Duo-Chrome Series',
    description: 'Color-shifting shades with dual-tone effects',
    shades: duoChromeSeries
  },
  {
    id: 'holographic',
    name: 'Holographic Series',
    description: 'Multi-dimensional shades with prismatic effects',
    shades: holographicSeries
  },
  {
    id: 'mixed',
    name: 'Mixed Tone Series',
    description: 'Perfectly blended combination shades',
    shades: mixedToneSeries
  },
  {
    id: 'pearl',
    name: 'Pearl Series',
    description: 'Sophisticated iridescent tones for cool, pearlescent results',
    shades: pearlSeries
  }
];
