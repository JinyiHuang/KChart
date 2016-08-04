//Test the polyline class

describe('PolyLine class tests',function(){
	var vertex=KChart.Vertex;
	var vertexes=[new vertex(0,0),new vertex(10,0),new vertex(10,10),new vertex(0,10)];
	var polyline=new KChart.PolyLine(vertexes);
	
	it('Should be constructed',function(){
		expect(polyline).not.toBe(undefined);
		expect(polyline.vertexes).toBe(vertexes);
	});
	
	it('Should get the correct perimeter',function(){
		expect(polyline.getPerimeter()).toBe(30);
	});
});
