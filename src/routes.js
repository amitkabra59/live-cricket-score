import Vue from 'vue'
import VueRouter from 'vue-router'

import LiveMatches from './components/LiveMatches'
import CompletedMatches from './components/CompletedMatches'
import UpcomingMatches from './components/UpcomingMatches'
import MatchInfo from './components/MatchInfo'



const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};


Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/completed', component: CompletedMatches
        },
        {
            path: '/', component: LiveMatches
        },
        {
            path: '/upcoming', component: UpcomingMatches
        },
        {
            path: '/scorecard', component: MatchInfo, props: true
        },
    ]
})