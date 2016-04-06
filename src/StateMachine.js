'use strict';
var //_ = require('underscore'),
	globalConstant = require('./GlobalConstant'),
	gs = globalConstant.statusStrings,
	ge = globalConstant.eventStrings;
	
var fsmContext = require('automata');

var FSMName = 'FSM';
var funName = {
	onEnter: 'onEnterState',
	onExit: 'onExitState',
	onTransition: 'onTransitionState'
};

fsmContext.registerFSM({
    name: FSMName,
    //logic: function(){},
    state: [
        { name: gs.constructed, onEnter: funName.onEnter, onExit: funName.onExit, initial : true },
        { name: gs.initing, onEnter: funName.onEnter, onExit: funName.onExit},
		{ name: gs.offline, onEnter: funName.onEnter, onExit: funName.onExit},
		{ name: gs.online, onEnter: funName.onEnter, onExit: funName.onExit},
		{ name: gs.starting, onEnter: funName.onEnter, onExit: funName.onExit},
		{ name: gs.prepairStop, onEnter: funName.onEnter, onExit: funName.onExit},
		{ name: gs.stopping, onEnter: funName.onEnter, onExit: funName.onExit},
		{ name: gs.prepairMaintain, onEnter: funName.onEnter, onExit: funName.onExit},
		{ name: gs.maintaining, onEnter: funName.onEnter, onExit: funName.onExit},
		{ name: gs.exit, onEnter: funName.onEnter, onExit: funName.onExit}
    ],
    transition : [
        { 	event: ge.ConstructedToIniting, 		onTransition: funName.onTransition,
			from: gs.constructed, 					to: gs.initing},
		{ 	event: ge.InitingToOffline, 			onTransition: funName.onTransition, 
			from: gs.initing, 						to: gs.offline},
        { 	event: ge.OfflineToExit, 				onTransition: funName.onTransition, 
			from: gs.offline, 						to: gs.exit},
			
		{	event: ge.OfflineToStarting,			onTransition: funName.onTransition, 
			from: gs.offline, 						to: gs.starting},
		{ 	event: ge.StartingToOnline, 			onTransition: funName.onTransition, 
			from: gs.starting, 						to: gs.online},
		{	event: ge.OnlineToPrepairStop, 			onTransition: funName.onTransition, 
			from: gs.online, 						to: gs.prepairStop},
		{ 	event: ge.PrepairStopToStopping, 		onTransition: funName.onTransition, 
			from: gs.prepairStop, 					to: gs.stopping},
		{ 	event: ge.StoppingToOffline, 			onTransition: funName.onTransition, 
			from: gs.stopping, 						to: gs.offline},
		
		{ 	event: ge.OnlineToPrepairMaintain, 		onTransition: funName.onTransition, 
			from: gs.online, 						to: gs.prepairMaintain},
		{ 	event: ge.PrepairMaintainToMaintaining,	onTransition: funName.onTransition, 
			from: gs.prepairMaintain, 				to: gs.maintaining},
		{ 	event: ge.MaintainingToOnline, 			onTransition: funName.onTransition, 
			from: gs.maintaining, 					to: gs.online}
    ]
});

var SessionController = class {
    onEnterState( session, state/*, transition, msg*/ ) {
        console.log("enter " + state.toString());
    }

	onExitState( session, state/*, transition, msg*/ ) {
        console.log("exit " + state.toString());
    }
	
    onTransitionState ( session, state, transition/*, msg*/ ) {
        console.log("transition: " + transition.toString());
    }
};

module.exports = { 
	get: function(/*context*/){
		var session= fsmContext.createSession({
			fda: FSMName, 
			controller: new SessionController()
		});
		return session;
	}
}

