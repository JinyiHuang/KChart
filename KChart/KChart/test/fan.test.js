//Test the fan class

describe('Fan class tests',function(){
	var vertex=KChart.Vertex;
	var center=new vertex(100,100);
	var fan=new KChart.Fan(center,50,0,0.5*Math.PI);
	
	it('Should be constructed',function(){
		expect(fan).not.toBe(undefined);
		expect(fan.center).toBe(center);
		expect(fan.radius).toBe(50);
		expect(fan.sAngle).toBe(0);
		expect(fan.eAngle).toBe(0.5*Math.PI);
	});
	
	it('Should get the correct perimeter',function(){
		expect(fan.getPerimeter()).toBe(2 * (Math.PI * fan.radius + fan.radius));
	});
	
	it('Should get the correct area',function(){
		expect(fan.getArea()).toBe(Math.PI*Math.pow(fan.radius,2));
	});
});
