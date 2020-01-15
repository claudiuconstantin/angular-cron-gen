/**
 * @fileoverview added by tsickle
 * Generated from: lib/Utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
var 
// @dynamic
Utils = /** @class */ (function () {
    function Utils() {
    }
    /** This returns a range of numbers. Starts from 0 if 'startFrom' is not set */
    /**
     * This returns a range of numbers. Starts from 0 if 'startFrom' is not set
     * @param {?} startFrom
     * @param {?} until
     * @return {?}
     */
    Utils.getRange = /**
     * This returns a range of numbers. Starts from 0 if 'startFrom' is not set
     * @param {?} startFrom
     * @param {?} until
     * @return {?}
     */
    function (startFrom, until) {
        return Array.from({ length: (until + 1 - startFrom) }, (/**
         * @param {?} _
         * @param {?} k
         * @return {?}
         */
        function (_, k) { return k + startFrom; }));
    };
    return Utils;
}());
// @dynamic
export default Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcm9uLWVkaXRvci8iLCJzb3VyY2VzIjpbImxpYi9VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTs7O0lBQUE7SUFLQSxDQUFDO0lBSkcsK0VBQStFOzs7Ozs7O0lBQ2pFLGNBQVE7Ozs7OztJQUF0QixVQUF1QixTQUFpQixFQUFFLEtBQWE7UUFDbkQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRTs7Ozs7UUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUcsU0FBUyxFQUFiLENBQWEsRUFBQyxDQUFDO0lBQ3BGLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQUxELElBS0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZHluYW1pY1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xuICAgIC8qKiBUaGlzIHJldHVybnMgYSByYW5nZSBvZiBudW1iZXJzLiBTdGFydHMgZnJvbSAwIGlmICdzdGFydEZyb20nIGlzIG5vdCBzZXQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFJhbmdlKHN0YXJ0RnJvbTogbnVtYmVyLCB1bnRpbDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAodW50aWwgKyAxIC0gc3RhcnRGcm9tKSB9LCAoXywgaykgPT4gayArIHN0YXJ0RnJvbSk7XG4gICAgfVxufVxuIl19