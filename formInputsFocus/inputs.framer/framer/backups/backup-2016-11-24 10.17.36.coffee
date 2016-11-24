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

finish = new Layer
	html:"well done"
	size:form.size
	backgroundColor: "#fff"
	color:"ccc"
	shadowSpread: 1
	shadowColor: "rgba(122,122,122,0.5)"
	shadowBlur: 33
	style:
		textAlign:"center"
		lineHeight:"600px"
	opacity:0
	scale:0.1

maxfields=2
form.center()
finish.center()
current=0
inputs=[]
for i in [0..maxfields]
	do(i)->
		Input = new InputField
			type: "text"
			width:  form.width-100
			superLayer: form
			height:70
			y: 80*i
			custom:
				index:i
			color: "#696969"
			backgroundColor: "rgba(238,238,238,0.5)"
			indent:   48
			fontSize: 24
			placeHolder: "enter details"
			placeHolderFocus: ""
			placeHolderColor: "silver"
			value: ""
			opacity:0
		if i==0
			Input.opacity=1
		inputs.push(Input)
for Input in inputs
	Input.on Events.Focus, (value, layer) ->
		current=this.custom.index
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
	finish.animate
	options:
		time: 0.2
		curve: "ease"
	