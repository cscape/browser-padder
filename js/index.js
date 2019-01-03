var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
(function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var fileSelect, fileElem, fileList, imageTemplateBlock, ratioEl, ratios, ratio, getImageDimensionsFromBlob, handleFiles;
    return __generator(this, function (_a) {
        fileSelect = document.getElementById('fileSelect');
        fileElem = document.getElementById('fileElem');
        fileList = document.getElementById('fileList');
        imageTemplateBlock = document.getElementById('ImageTemplateBlock');
        ratioEl = document.getElementById('RatioElement');
        ratios = [0.25, 0.50, 1.00, 1.25, 1.50];
        ratio = 1;
        ratios.forEach(function (num) {
            var number = num.toFixed(2).toString() + "x";
            var optionEl = document.createElement('option');
            optionEl.setAttribute('value', num);
            optionEl.innerText = number;
            if (ratio === num)
                optionEl.setAttribute('selected', true);
            ratioEl.appendChild(optionEl);
        });
        ratioEl.onchange = function () { return (ratio = ratioEl.value); };
        getImageDimensionsFromBlob = function (blob) {
            return new Promise(function (resolve) {
                var imageObj = document.createElement('img');
                var url = URL.createObjectURL(blob);
                imageObj.onload = function () {
                    URL.revokeObjectURL(url);
                    resolve({
                        width: imageObj.width,
                        height: imageObj.height,
                        image: imageObj
                    });
                };
                imageObj.src = url;
            });
        };
        handleFiles = function (files) {
            fileList.innerHTML = '';
            if (!files.length)
                return;
            Array.apply(void 0, files).forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                var clone, canvas, context, _a, width, height, image, margin;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            clone = document.importNode(imageTemplateBlock.content, true);
                            canvas = document.createElement('canvas');
                            context = canvas.getContext('2d');
                            return [4 /*yield*/, getImageDimensionsFromBlob(file)];
                        case 1:
                            _a = _b.sent(), width = _a.width, height = _a.height, image = _a.image;
                            margin = Math.min((height / 10), (width / 10)) / ratio;
                            canvas.height = height + (margin * 2);
                            canvas.width = width + (margin * 2);
                            context.fillStyle = '#FFFFFF';
                            context.fillRect(0, 0, canvas.width, canvas.height);
                            context.drawImage(image, margin, margin);
                            canvas.toBlob(function (blob) {
                                var imageEl = clone.querySelector('.image-padded');
                                var url = URL.createObjectURL(blob);
                                imageEl.onload = function () {
                                    fileList.appendChild(clone);
                                    // no longer need to read the blob so it's revoked
                                    // URL.revokeObjectURL(url)
                                };
                                imageEl.src = url;
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        fileSelect.onclick = function (event) {
            fileElem.click();
            event.preventDefault(); // prevent navigation to "#"
        };
        fileElem.onchange = function () {
            handleFiles(this.files);
        };
        return [2 /*return*/];
    });
}); })();