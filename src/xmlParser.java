import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;
import org.json.JSONArray;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class xmlParser {

	public static void exportData ( Element node, java.util.ArrayList<java.util.HashMap<String, String>> ob ) {

		writeData( node, ob );

		List<Element> nodeList = node.getChildren();
		for ( org.jdom2.Element currentNode : nodeList ) {
			if ( !currentNode.getChildren().isEmpty() ) {
				exportData( currentNode, ob );
			} else {
				writeData( currentNode, ob );
			}
		}
	}

	public static void createNode(String duplicable,String path,String block, String type, String rights,java.util.ArrayList<java.util.HashMap<String, String>> ob){
		HashMap<String,String> line = new java.util.HashMap<String, String>(  );
		line.put( "path", path );
		line.put( "block", block );
		line.put( "rights", rights );
		line.put( "type", type );
		line.put( "duplicable", duplicable );
		ob.add( line );
	}

	public static void writeData ( Element node1, java.util.ArrayList<java.util.HashMap<String, String>> ob ) {

		HashMap<String, String> line = new HashMap<String, String>();

		String path = "";
		Element node = node1;
		while ( node != null ) {
			path = "/" + node.getName() + path;
			node = node.getParentElement();
		}

		line.put( "path", path );

		if ( node1.getChildren() != null && !node1.getChildren().isEmpty() ) {
			line.put( "block", "true" );
		} else {
			line.put( "block", "false" );
		}

		line.put( "rights", "rw" );
		line.put( "type", node1.getName() );

		ob.add( line );

	}


	public static void main ( String[] args ) {

		SAXBuilder builder = new SAXBuilder();
		File xmlFile = new File( "/home/cratein/Desktop/sample.xml" );
		java.util.ArrayList<java.util.HashMap<String, String>> mainOb = new ArrayList<java.util.HashMap<String, String>>();

		try {

			Document document = builder.build( xmlFile );
			exportData( document.getRootElement(), mainOb );
			System.out.println( mainOb );

			JSONArray json = new JSONArray( mainOb );
			System.out.println( json );

		} catch ( IOException io ) {
			System.out.println( io.getMessage() );
		} catch ( JDOMException jdomex ) {
			System.out.println( jdomex.getMessage() );
		}

		ArrayList<String> typeList = new java.util.ArrayList<String>(  );
		ArrayList<HashMap<String,String>> nodes = new java.util.ArrayList<java.util.HashMap<String, String>>(  );


		File typeFile = new File( "/home/cratein/Desktop/elements-ISO.xml" );
		try{
			Document typedocument = builder.build( typeFile );
			Element re = typedocument.getRootElement();
			for(Element e : re.getChildren()){
				typeList.add( e.getAttributes().get( 0 ).getValue() );
			}

		}
		catch( JDOMException jdomEx){
			System.out.println( jdomEx.getMessage() );

		}
		catch ( IOException ioEx ) {
			System.out.println( ioEx.getMessage() );

		}
		boolean quit=false;
		while(!quit) {

			String path = "";
			System.out.println( "Quel type de champ/block voulez-vous créer?" );
			int i = 0;
			for ( String s : typeList ) {
				System.out.println( i + " - " + s );
				i++;
			}
			java.util.Scanner sc = new java.util.Scanner( System.in );
			String type = typeList.get( sc.nextInt() );

			if ( !nodes.isEmpty() ) {
				System.out.println( "Dans quel block voulez vous l'intégrer?" );
				i = 0;
				for ( java.util.HashMap s : nodes ) {
					System.out.println( i + " - " + s.get( "path" ) );
					i++;
				}

				int blockNumber = sc.nextInt();
				path = nodes.get( blockNumber ).get( "path" ) + "/" + type;
				nodes.get( blockNumber ).remove( "block" );
				nodes.get( blockNumber ).put( "block", "true" );
			} else
				path = type;

			String duplicable = "false";

			String block = "false";

			String rights = "rw";

			createNode( duplicable, path, block, type, rights, nodes );

			System.out.println( "\n\n" + nodes );

			System.out.println("quiter?");
			if(sc.next().equalsIgnoreCase( "1" )){
				quit=true;
			}
		}
		try {

			// Writing to a file
			File file=new File("/home/cratein/Desktop/test.json");
			file.createNewFile();
			java.io.FileWriter fileWriter = new java.io.FileWriter(file);
			JSONArray json2 = new JSONArray( nodes );

			fileWriter.write(json2.toString());
			fileWriter.flush();
			fileWriter.close();

		} catch (IOException e) {
			e.printStackTrace();
		}


	}

}


