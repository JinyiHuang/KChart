//Test the polygon class

describe('Polygon class tests',function(){
	var vertex=KChart.Vertex;
	var vertexes=[new vertex(0,0),new vertex(10,0),new vertex(10,10),new vertex(0,10)];
	var polygon=new KChart.Polygon(vertexes);
	
	it('Should be constructed',function(){
		expect(polygon).not.toBe(undefined);
		expect(polygon.vertexes).toBe(vertexes);
	});
	
	it('Should get the correct perimeter',function(){
		expect(polygon.getPerimeter()).toBe(40);
	});
	
	it('Should get the correct area',function(){
		expect(polygon.getArea()).toBe(100);
	});
});
