var assert = require("assert");
var globalConstant = require('../src/GlobalConstant'),
	gs = globalConstant.statusStrings,
	ge = globalConstant.eventStrings;
	StateMachine = require("../src/StateMachine");

describe('StateMachine', function(){
	describe('#start', function(){
		it('should start successfully', function(done){
			var session = StateMachine.get();
			session.start( function (session) {
				session.consume( {msgId: ge.ConstructedToIniting}, function(session) {
					done();
				});
			});
		});
	});
});

/*
 fsmContext.createSession({
	fda: FSMName, 
	controller: new SessionController()
});
session.start( function (session) {
	console.log(_.functions(session));
	console.log(_.keys(session));

	console.log(session.getCurrentState());
	session.printStackTrace();

	session.consume( {msgId: ge.ConstructedToIniting} );
	session.consume( {msgId: ge.InitingToOffline} );
	session.consume( {msgId: ge.OfflineToStarting} );
	session.consume( {msgId: ge.StartingToOnline} );
	session.consume( {msgId: ge.OnlineToPrepairMaintain} );
	session.consume( {msgId: ge.PrepairMaintainToMaintaining} );
	session.consume( {msgId: ge.MaintainingToOnline} );
	session.consume( {msgId: ge.OnlineToPrepairStop} );
	session.consume( {msgId: ge.PrepairStopToStopping} );
	session.consume( {msgId: ge.StoppingToOffline} );
	session.consume( {msgId: ge.OfflineToExit}, function(session) {
		console.log(session.getCurrentState());
		session.printStackTrace();
		console.log(arguments);
		process.exit();
	});
});
*/