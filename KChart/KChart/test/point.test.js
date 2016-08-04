//Test the point class

describe('Point class tests',function(){
	var vertex=KChart.Vertex;
	var vertex=new vertex(10,10);
	var point=new KChart.Point(vertex);
	
	it('Should be constructed',function(){
		expect(point).not.toBe(undefined);
		expect(point.vertexes).toBe(vertex);
	});
});
