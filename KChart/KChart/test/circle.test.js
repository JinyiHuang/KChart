//Test the circle class

describe('Circle class tests',function(){
	var vertex=KChart.Vertex;
	var center=new vertex(100,100);
	var circle=new KChart.Circle(center,50);
	
	it('Should be constructed',function(){
		expect(circle).not.toBe(undefined);
		expect(circle.center).toBe(center);
		expect(circle.radius).toBe(50);
	});
	
	it('Should get the correct perimeter',function(){
		expect(circle.getPerimeter()).toBe(2*Math.PI*circle.radius);
	});
	
	it('Should get the correct area',function(){
		expect(circle.getArea()).toBe(Math.PI*Math.pow(circle.radius,2));
	});
});
