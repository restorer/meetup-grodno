jQuery(function($) {
	var options = {
		guest: {
			def: 'yes',
			avail: ['yes', 'no']
		},
		alert: {
			def: 'yes',
			avail: ['yes', 'no']
		},
		page: {
			def: '',
			avail: [
				'',
				'events',
				'reports',
				'ideas',
				'archive',
				'articles',
				'topics',
				'event-single',
				'idea-single',
				'report-single',
				'archive-single',
				'about',
				'contact'
			]
		},
		events: {
			def: '3',
			avail: ['1', '2', '3']
		}
	};

	var config = _.object(_.map(_.pairs(options), function(v) {
		return [v[0], v[1].def];
	}));

	_.each(location.search.replace(/^\?/, '').split('&'), function(v) {
		if (v != '') {
			var pair = v.split(/=/);
			var key = decodeURIComponent(pair[0]);

			if (options[key]) {
				var value = decodeURIComponent((pair[1] || '').replace(/\+/g, ' '));

				if (~options[key].avail.indexOf(value)) {
					config[key] = value;
				}
			}
		}
	});

	if (config.guest == 'yes') {
		$('body').addClass('meetup-body-guest');
	}

	var link = function(name, value) {
		var params = _.clone(config);
		params[name] = value;

		return '?' + _.map(_.filter(_.pairs(params), function(v) {
			return (options[v[0]].def != v[1]);
		}), function(v) {
			return encodeURIComponent(v[0]) + '=' + encodeURIComponent(v[1]);
		}).join('&');
	};

	var content = _.template($({
		'': '#mockup-index',
		'events': '#mockup-index',
		'reports': '#mockup-index',
		'ideas': '#mockup-index',
		'archive': '#mockup-index',
		'articles': '#mockup-index',
		'topics': '#mockup-topics',
		'event-single': '#mockup-event-single',
		'idea-single': '#mockup-idea-single',
		'report-single': '#mockup-report-single',
		'archive-single': '#mockup-archive-single',
		'about': '#mockup-about',
		'contact': '#mockup-contact'
	}[config.page]).html(), {
		config: config,
		link: link
	});

	$('#mockup-rendered').html(_.template($('#mockup-layout').html(), {
		config: config,
		content: content,
		link: link
	}));
});
