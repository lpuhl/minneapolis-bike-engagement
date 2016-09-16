DROP FUNCTION IF EXISTS insert_crowd_mapping_data(text,text,text, text, text, text, text, text, text, text, text);
--Assumes only one value being inserted

CREATE OR REPLACE FUNCTION insert_crowd_mapping_data (
    _geojson TEXT,
    _comment TEXT,
    _firstname TEXT,
	_lastname TEXT,
	_street TEXT,
	_city TEXT,
	_state TEXT,
	_zip TEXT,
	_phone TEXT,
	_email TEXT,
	_list TEXT)
--Has to return something in order to be used in a "SELECT" statement
RETURNS integer
AS $$
DECLARE
    _the_geom GEOMETRY;
	--The name of your table in cartoDB
	_the_table TEXT := 'mpls_bikeways';
BEGIN
    --Convert the GeoJSON to a geometry type for insertion.
    _the_geom := ST_SetSRID(ST_GeomFromGeoJSON(_geojson),4326);


	--Executes the insert given the supplied geometry, description, and username, while protecting against SQL injection.
    EXECUTE ' INSERT INTO '||quote_ident(_the_table)||' (the_geom, comment, firstname, lastname, street, city, state, zip, phone, email, list)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            ' USING _the_geom, _comment, _firstname, _lastname, _street, _city, _state, _zip, _phone, _email, _list;

    RETURN 1;
END;
$$
LANGUAGE plpgsql SECURITY DEFINER ;

--Grant access to the public user
GRANT EXECUTE ON FUNCTION insert_crowd_mapping_data( text, text, text, text, text, text, text, text, text, text, text) TO publicuser;
