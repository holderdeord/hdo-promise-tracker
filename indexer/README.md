## Ved rettelser:

* Legg in rettelse i regnearkene
* Kjør `cd indexer && npm run deploy && cd - && cd webapp && npm run deploy`
* Lag ny CSV-dump på hdo02: `es2csv -q '*' -i hdo-promise-tracker-2017 -o /webapps/files/data/csv/loftesjekk-2017.csv`
