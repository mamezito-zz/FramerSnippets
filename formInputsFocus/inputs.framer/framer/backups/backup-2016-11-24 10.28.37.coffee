# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: "type form behaviour"
	author: "Sergiy Voronov"
	twitter: "mamezito"
	description: "switching focus on next field when pressing enter or TAB"

{InputField} = require 'InputField'

bg = new BackgroundLayer
	backgroundColor: "#fff"
	

form= new Layer
	width: 600	
	height: 600
	backgroundColor: "null"
	x: 136

finishModal = new Layer
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
finishModal.center()
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
# 		when we are focusing on a field, we are applying its index to current variable
		current=this.custom.index

	Input.on Events.Input, (value, layer) ->
		setDefault @ if @.isEmpty
		if inputs[current+1]
			inputs[current+1].opacity = 1


# we are creating arrays of all inputs on page
inputFields = document.getElementsByTagName('input');

#listening to key press 
window.onkeypress = (e) ->
# 	if we press enter or TAB
	if e.which == 13 or e.which == 9
		#and we are not on last field
		if current<maxfields
			e.preventDefault()
			#we are focusing on next field
			nextInput = inputFields[current+1]
			nextInput.focus()
		else
# 			if we were on last field, we are firing finish function
			finish()		
		
	return



finish=()->
	finishModal.animate
		opacity:1
		scale:1
		options:
			time: 0.2
			curve: "ease"
	