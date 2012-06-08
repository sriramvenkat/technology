/**
 * Diese Klasse stellt ein einzelnes Slide-Element dar
 */
var Tx_Infotech_StageSlide = new Class({

	Implements: [Options],

	options: {
		triggerIndicationDelay: 0,  // Verzögerung bis zum Aufruf des "indicateTrigger", also des Andeutens des Triggers
		triggerIndicationSpeed: 450 // Geschwindigkeit in ms für TriggerIndication
	},

	/**
	 * Konstruktor
	 * @param Object options
	 */
	initialize: function(element, options) {
		this.setOptions(options);
		this.element = document.id(element);

			// Trigger-"Andeutung" mit entsprechender Verzögerung starten:
		this.indicateTrigger.delay(this.options.triggerIndicationDelay, this);


			// Events attachen:
		this.attachEvents();
	},


	/**
	 * Notwendige Events hinzufügen
	 */
	attachEvents: function() {

		var slideContentElement = this.element.getElement('.slideContent');

		this.element.addEvents({
			'mouseenter': function(){
				this.element.removeClass('expanding').addClass('expanding expanding-in');

				var that = this;
				slideContentElement
					.tween('left', 145)
					.get('tween')
						.chain(function(){ that.element.removeClass('expanding').removeClass('expanding-in').addClass('expanded'); });
			}.bind(this),

			'mouseleave': function(){
				this.element.removeClass('expanding').removeClass('expanding-out').addClass('expanding expanding-out').removeClass('expanded').removeClass('expanding-in');

				var that = this;
				slideContentElement
					.tween('left', -574)
					.get('tween')
						.chain(function(){ that.element.removeClass('expanding').removeClass('expanding-out'); });
			}.bind(this)
		});
	},



	/**
	 * Deutet das kurze Heraus- und Hereinfahren des Triggers an
	 */
	indicateTrigger: function() {
			// initialen Rechtswert des Elements speichern, falls dieser nocht nie gespeichert wurde:
		if (!this.element.retrieve('originleft')) {
			this.element.store('originleft', this.element.getStyle('left'));
		}
		

		var that = this;
		this.element    // das ganze <li>
			.set('tween', {duration: this.options.triggerIndicationSpeed})
			.addClass('teasing')
			.tween('left', 0)
			.get('tween')
				.chain(function(){
					that.element
						.tween('left', that.element.retrieve('originleft'))
						.get('tween')
							.chain(function(){ that.element.removeClass('teasing')});
				})
	}
});
