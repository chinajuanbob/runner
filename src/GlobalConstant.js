'use strict';
	
var statusStrings = {
	constructed:        'constructed',
	initing:            'initing',
	offline:            'offline',
	online:             'online',
	starting:           'starting',
	prepairStop:        'prepairStop',
	stopping:           'stopping', //wait for current work done, or force stop them
	prepairMaintain:    'prepairMaintain', //wait for current work done, the begin maintain
	maintaining: 		'maintaining',
	exit:				'exit',
	error:				'error'
};

var eventStrings  = {
	ConstructedToIniting: 			'ConstructedToIniting',
	InitingToOffline: 				'InitingToOffline',
	OfflineToExit: 					'OfflineToExit',
	OfflineToStarting: 				'OfflineToStarting',
	StartingToOnline: 				'StartingToOnline',
	OnlineToPrepairStop: 			'OnlineToPrepairStop',
	PrepairStopToStopping: 			'PrepairStopToStopping',
	StoppingToOffline: 				'StoppingToOffline',
	OnlineToPrepairMaintain: 		'OnlineToPrepairMaintain',
	PrepairMaintainToMaintaining: 	'PrepairMaintainToMaintaining',
	MaintainingToOnline: 			'MaintainingToOnline'
};

var category = {
};

var logLevel = {
	error: 		'error',
	warn: 		'warn',
	info: 		'info',
	verbose: 	'verbose',	
	debug: 		'debug',	
	silly: 		'silly'	
};

var action = {
};

module.exports = {
	statusStrings: statusStrings,
	eventStrings: eventStrings,
	category: category,
	logLevel: logLevel,
	action: action
};