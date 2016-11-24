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
	backgroundColor: "rgba(49,50,50,1)"
	

modalBG = new Layer
	width: 645
	y: 339
	height: 428
	backgroundColor: "rgba(252,255,255,1)"
	x: 136
	
modalBG.center()
current=0
inputs=[]
for i in [0..3]
	do(i)->
		Input = new InputField
			name: "colorInput"
			type: "text"
			width:  modalBG.width
			superLayer: modalBG
			height: 132
			y: 132*i
			custom:
				index:i
			color: "#696969"
			backgroundColor: "#ffffff"
			indent:   48
			fontSize: 24
			fontWeight: 300
			fontFamily: "Roboto"
			placeHolder: "Say something"
			placeHolderFocus: ""
			placeHolderColor: "silver"
			value: ""
			opacity:0.5
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
		inputs[current+1].opacity = 1
	



	



inputFields = document.getElementsByTagName('input');

window.onkeypress = (e) ->
  if e.which == 13
    e.preventDefault()
    nextInput = inputField[1]
    if nextInput
      nextInput.focus()
  return


