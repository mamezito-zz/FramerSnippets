# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Christian Poschmann"
	twitter: ""
	description: ""

{InputField} = require 'InputField'


	




bg = new BackgroundLayer
	backgroundColor: "#fff"
	

form= new Layer
	width: 600	
	height: 600
	backgroundColor: "null"
	x: 136

maxfields=2
form.center()
current=0
inputs=[]
for i in [0..maxfields]
	do(i)->
		Input = new InputField
			type: "text"
			width:  form.width-100
			superLayer: form
			height:70
			y: 70*i
			custom:
				index:i
			color: "#696969"
			backgroundColor: "#ffffff"
			border:"#000"
			placeHolder: "Say something"
			placeHolderFocus: ""
			placeHolderColor: "silver"
			value: ""
			opacity:0
		if i==0
			Input.opacity=1
		inputs.push(Input)
		# lineHeight: 30
for Input in inputs
	Input.on Events.Focus, (value, layer) ->
		current=this.custom.index
		print current
		@.color = @.originalTextColor

	Input.on Events.Input, (value, layer) ->
		setDefault @ if @.isEmpty
		if inputs[current+1]
			inputs[current+1].opacity = 1
	



	



inputFields = document.getElementsByTagName('input');

window.onkeypress = (e) ->
	if e.which == 13
		if current<maxfields
			e.preventDefault()
			nextInput = inputFields[current+1]
			if nextInput
				nextInput.focus()
		else
			finish()		
		
	return

finish=()->
	print "some finish code"
