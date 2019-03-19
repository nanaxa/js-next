var str = "Stephen Desmonde had returned home after several years at 'Oxford', where he had been taking a course of 'theology'. Stephen himself did not want to be a 'parson' and had only taken up the course because his father wished him to do so. He was fond of painting and wanted to devote his life to art. Against his father's will he left England to study painting in France. On arriving in Paris he entered Professor Dupret's Art School. The extract given below is an account of his meeting with other students from England.";

var regexp = new RegExp('\'', 'g');


console.log(str.replace(regexp, '"'));