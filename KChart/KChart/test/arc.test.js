//Test the arc class

describe('Arc class tests',function(){
	var vertex=KChart.Vertex;
	var center=new vertex(100,100);
	var arc=new KChart.Arc(center,50,0,0.5*Math.PI);
	
	it('Should be constructed',function(){
		expect(arc).not.toBe(undefined);
		expect(arc.center).toBe(center);
		expect(arc.radius).toBe(50);
		expect(arc.sAngle).toBe(0);
		expect(arc.eAngle).toBe(0.5*Math.PI);
	});
	
	it('Should get the correct perimeter',function(){
		expect(arc.getPerimeter()).toBe(2*Math.PI*arc.radius);
	});
	
	it('Should get the correct area',function(){
		expect(arc.getArea()).toBe(Math.PI*Math.pow(arc.radius,2));
	});
});
