String.prototype.toTitleCase = function(){
    return this.toLowerCase().replace(/(^[a-z]| [a-z]|-[a-z])/g,
        function($1){
            return $1.toUpperCase();
        }
    );
};