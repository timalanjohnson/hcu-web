/*
 *	#1055 - Expression #1 of SELECT list is not in GROUP BY clause 
 *	and contains nonaggregated column 'hcu.his.AdmissionDate' which 
 *	is not functionally dependent on columns in GROUP BY clause; 
 *	this is incompatible with sql_mode=only_full_group_by
 *
 *  To remedy this error, run the following SQL command.
 */

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));