#!/usr/bin/env bash


SOURCE="${BASH_SOURCE[0]}";
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )";
  SOURCE="$(readlink "$SOURCE")";
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"; # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )";
cd "$DIR";

BASENAME="$(basename `pwd`)";
DATE=`date "+%y%m%d-%H%M%S"`;
TARGET="$BASENAME-$DATE.zip";

function end() { 
	[[ $1 == "0" ]] && echo "[+] exit: 0" || echo "[-] exit $1";
	exit $1; }

echo "[.] building sources ...";
npm run build-prod || end 1;

echo "[.] creating archive ...";
zip -r "${TARGET}" "dist" || end 2;

end 0;
