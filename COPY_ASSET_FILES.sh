#!/usr/bin/env bash

TARGET="dist/assets";

SOURCE="${BASH_SOURCE[0]}";
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )";
  SOURCE="$(readlink "$SOURCE")";
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"; # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )";
cd "$DIR";

function end() { 
	[[ $1 == "0" ]] && echo "[+] exit: 0" || echo "[-] exit $1";
	exit $1; }


echo "[.] creating target folder ...";
[[ -z "$TARGET" ]] && end 1; # avoding empty path
if [[ -d "$TARGET" ]]; then rm -rf "$TARGET" || end 1; fi
mkdir -p "$TARGET" || end 1;

echo "[.] generating javascript ...";
JS="$TARGET/vendor.min.js";
echo "" > "$JS" || end 2;
cat ./node_modules/jquery/dist/jquery.slim.min.js >> "$JS" || end 2;
echo "" >> "$JS" || end 2; # empty line
cat ./node_modules/popper.js/dist/umd/popper.min.js >> "$JS" || end 2;
echo "" >> "$JS" || end 2; # empty line
cat ./node_modules/bootstrap/dist/js/bootstrap.min.js >> "$JS" || end 2;

end 0;