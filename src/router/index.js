import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/homepage/Homepage'
import GamesList from '@/components/games/list/GamesList'
import PuzzleLevels from '@/components/games/puzzle/levels/Levels'
import PuzzleLvl1 from '@/components/games/puzzle/lvl1/Puzzle'
import PuzzleLvl2 from '@/components/games/puzzle/lvl2/Puzzle'
import PuzzleLvl3 from '@/components/games/puzzle/lvl3/Puzzle'
import PuzzleLvl4 from '@/components/games/puzzle/lvl4/Puzzle'
import PuzzleLvl5 from '@/components/games/puzzle/lvl5/Puzzle'
import PuzzleLvl6 from '@/components/games/puzzle/lvl6/Puzzle'
import PuzzleLvl7 from '@/components/games/puzzle/lvl7/Puzzle'
import PuzzleLvl8 from '@/components/games/puzzle/lvl8/Puzzle'
import PuzzleLvl9 from '@/components/games/puzzle/lvl9/Puzzle'
import PuzzleLvl10 from '@/components/games/puzzle/lvl10/Puzzle'

import LerndadLevels from '@/components/games/lerndad/levels/Levels'
import LerndadLvl1 from '@/components/games/lerndad/lvl1/LernDaD'
import LerndadLvl2 from '@/components/games/lerndad/lvl2/LernDaD'
import LerndadLvl3 from '@/components/games/lerndad/lvl3/LernDaD'
import LerndadLvl4 from '@/components/games/lerndad/lvl4/LernDaD'
import LerndadLvl5 from '@/components/games/lerndad/lvl5/LernDaD'
import LerndadLvl6 from '@/components/games/lerndad/lvl6/LernDaD'
import LerndadLvl7 from '@/components/games/lerndad/lvl7/LernDaD'
import LerndadLvl8 from '@/components/games/lerndad/lvl8/LernDaD'
import LerndadLvl9 from '@/components/games/lerndad/lvl9/LernDaD'
import LerndadLvl10 from '@/components/games/lerndad/lvl10/LernDaD'
import LerndadLvl11 from '@/components/games/lerndad/lvl11/LernDaD'
import LerndadLvl12 from '@/components/games/lerndad/lvl12/LernDaD'
import LerndadLvl13 from '@/components/games/lerndad/lvl13/LernDaD'
import LerndadLvl14 from '@/components/games/lerndad/lvl14/LernDaD'
import LerndadLvl15 from '@/components/games/lerndad/lvl15/LernDaD'
import LerndadLvl16 from '@/components/games/lerndad/lvl16/LernDaD'
import LerndadLvl17 from '@/components/games/lerndad/lvl17/LernDaD'
import LerndadLvl18 from '@/components/games/lerndad/lvl18/LernDaD'
import LerndadLvl19 from '@/components/games/lerndad/lvl19/LernDaD'
import LerndadLvl20 from '@/components/games/lerndad/lvl20/LernDaD'
import LerndadLvl21 from '@/components/games/lerndad/lvl21/LernDaD'
import LerndadLvl22 from '@/components/games/lerndad/lvl22/LernDaD'
import LerndadLvl23 from '@/components/games/lerndad/lvl23/LernDaD'
import LerndadLvl24 from '@/components/games/lerndad/lvl24/LernDaD'
import LerndadLvl25 from '@/components/games/lerndad/lvl25/LernDaD'
import LerndadLvl26 from '@/components/games/lerndad/lvl26/LernDaD'
import LerndadLvl27 from '@/components/games/lerndad/lvl27/LernDaD'
import LerndadLvl28 from '@/components/games/lerndad/lvl28/LernDaD'
import LerndadLvl29 from '@/components/games/lerndad/lvl29/LernDaD'
import LerndadLvl30 from '@/components/games/lerndad/lvl30/LernDaD'

import MazeLevels from '@/components/games/maze/levels/Levels'
import MazeMain from '@/components/games/maze/main/Maze'

import CollectorMain from '@/components/games/collector/main/Collector'
import CollectorLevels from '@/components/games/collector/levels/Levels'

import ShapesMain from '@/components/games/shapes/main/Shapes'
import ShapesLevels from '@/components/games/shapes/levels/Levels'

import roboProgramiakMain from '@/components/games/roboProgramiak/main/roboProgramiak'
import roboProgramiakLevels from '@/components/games/roboProgramiak/levels/Levels'

import zooMain from '@/components/games/zoo/main/zoo'
import zooLevels from '@/components/games/zoo/levels/Levels'

import JSbotMain from '@/components/games/JSbot/main/JSbot'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/games',
      name: 'GamesList',
      component: GamesList
    },
    {
      path: '/game/puzzle',
      name: 'game-puzzle',
      component: PuzzleLevels
    },
    {
      path: '/game/puzzle/lvl1',
      name: 'puzzle-lvl1',
      component: PuzzleLvl1
    },
    {
      path: '/game/puzzle/lvl2',
      name: 'puzzle-lvl2',
      component: PuzzleLvl2
    },
    {
      path: '/game/puzzle/lvl3',
      name: 'puzzle-lvl3',
      component: PuzzleLvl3
    },
    {
      path: '/game/puzzle/lvl4',
      name: 'puzzle-lvl4',
      component: PuzzleLvl4
    },
    {
      path: '/game/puzzle/lvl5',
      name: 'puzzle-lvl5',
      component: PuzzleLvl5
    },
    {
      path: '/game/puzzle/lvl6',
      name: 'puzzle-lvl6',
      component: PuzzleLvl6
    },
    {
      path: '/game/puzzle/lvl7',
      name: 'puzzle-lvl7',
      component: PuzzleLvl7
    },
    {
      path: '/game/puzzle/lvl8',
      name: 'puzzle-lvl8',
      component: PuzzleLvl8
    },
    {
      path: '/game/puzzle/lvl9',
      name: 'puzzle-lvl9',
      component: PuzzleLvl9
    },
    {
      path: '/game/puzzle/lvl10',
      name: 'puzzle-lvl10',
      component: PuzzleLvl10
    },
    {
      path: '/game/lotr',
      name: 'game-lotr',
      component: GamesList
    },
    {
      path: '/game/maze',
      name: 'game-maze',
      component: MazeLevels
    },
    {
      path: '/game/maze/lvl/:id',
      name: 'maze-main',
      component: MazeMain
    },
    {
      path: '/shapes/maze',
      name: 'game-shapes',
      component: ShapesLevels
    },
    {
      path: '/game/shapes/lvl/:id',
      name: 'shapes-main',
      component: ShapesMain
    },
    {
      path: '/game/collector',
      name: 'game-collector',
      component: CollectorLevels
    },
    {
      path: '/game/collector/lvl/:id',
      name: 'collector-main',
      component: CollectorMain
    },
    {
      path: '/game/roboProgramiak',
      name: 'game-roboProgramiak',
      component: roboProgramiakLevels
    },
    {
      path: '/game/roboProgramiak/lvl/:id',
      name: 'roboProgramiak-main',
      component: roboProgramiakMain
    },
    {
      path: '/game/zoo',
      name: 'game-zoo',
      component: zooLevels
    },
    {
      path: '/game/zoo/lvl/:id',
      name: 'zoo-main',
      component: zooMain
    },
    {
      path: '/game/lerndad',
      name: 'game-lerndad',
      component: LerndadLevels
    },
    {
      path: '/game/lerndad/lvl1',
      name: 'lerndad-lvl1',
      component: LerndadLvl1
    },
    {
      path: '/game/lerndad/lvl2',
      name: 'lerndad-lvl2',
      component: LerndadLvl2
    },
    {
      path: '/game/lerndad/lvl3',
      name: 'lerndad-lvl3',
      component: LerndadLvl3
    },
    {
      path: '/game/lerndad/lvl4',
      name: 'lerndad-lvl4',
      component: LerndadLvl4
    },
    {
      path: '/game/lerndad/lvl5',
      name: 'lerndad-lvl5',
      component: LerndadLvl5
    },
    {
      path: '/game/lerndad/lvl6',
      name: 'lerndad-lvl6',
      component: LerndadLvl6
    },
    {
      path: '/game/lerndad/lvl7',
      name: 'lerndad-lvl7',
      component: LerndadLvl7
    },
    {
      path: '/game/lerndad/lvl8',
      name: 'lerndad-lvl8',
      component: LerndadLvl8
    },
    {
      path: '/game/lerndad/lvl9',
      name: 'lerndad-lvl9',
      component: LerndadLvl9
    },
    {
      path: '/game/lerndad/lvl10',
      name: 'lerndad-lvl10',
      component: LerndadLvl10
    },
    {
      path: '/game/lerndad/lvl11',
      name: 'lerndad-lvl11',
      component: LerndadLvl11
    },
    {
      path: '/game/lerndad/lvl12',
      name: 'lerndad-lvl12',
      component: LerndadLvl12
    },
    {
      path: '/game/lerndad/lvl13',
      name: 'lerndad-lvl13',
      component: LerndadLvl13
    },
    {
      path: '/game/lerndad/lvl14',
      name: 'lerndad-lvl14',
      component: LerndadLvl14
    },
    {
      path: '/game/lerndad/lvl15',
      name: 'lerndad-lvl15',
      component: LerndadLvl15
    },
    {
      path: '/game/lerndad/lvl16',
      name: 'lerndad-lvl16',
      component: LerndadLvl16
    },
    {
      path: '/game/lerndad/lvl17',
      name: 'lerndad-lvl17',
      component: LerndadLvl17
    },
    {
      path: '/game/lerndad/lvl18',
      name: 'lerndad-lvl18',
      component: LerndadLvl18
    },
    {
      path: '/game/lerndad/lvl19',
      name: 'lerndad-lvl19',
      component: LerndadLvl19
    },
    {
      path: '/game/lerndad/lvl20',
      name: 'lerndad-lvl20',
      component: LerndadLvl20
    },
    {
      path: '/game/lerndad/lvl21',
      name: 'lerndad-lvl21',
      component: LerndadLvl21
    },
    {
      path: '/game/lerndad/lvl22',
      name: 'lerndad-lvl22',
      component: LerndadLvl22
    },
    {
      path: '/game/lerndad/lvl23',
      name: 'lerndad-lvl23',
      component: LerndadLvl23
    },
    {
      path: '/game/lerndad/lvl24',
      name: 'lerndad-lvl24',
      component: LerndadLvl24
    },
    {
      path: '/game/lerndad/lvl25',
      name: 'lerndad-lvl25',
      component: LerndadLvl25
    },
    {
      path: '/game/lerndad/lvl26',
      name: 'lerndad-lvl26',
      component: LerndadLvl26
    },
    {
      path: '/game/lerndad/lvl27',
      name: 'lerndad-lvl27',
      component: LerndadLvl27
    },
    {
      path: '/game/lerndad/lvl28',
      name: 'lerndad-lvl28',
      component: LerndadLvl28
    },
    {
      path: '/game/lerndad/lvl29',
      name: 'lerndad-lvl29',
      component: LerndadLvl29
    },
    {
      path: '/game/lerndad/lvl30',
      name: 'lerndad-lvl30',
      component: LerndadLvl30
    },
    {
      path: '/game/JSbotMain/JSbot',
      name: 'game-JSbot',
      component: JSbotMain
    },
  ]
})
