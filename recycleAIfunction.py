
"""
import azure.ai.vision as sdk
import sys
from PIL import Image, ImageDraw, ImageFont


service_options = sdk.VisionServiceOptions("https://compvisleo.cognitiveservices.azure.com/","300b86fa09e84b00bc845058a895ccf7")

#takes in, as a string, the url of a local photo file, and returns a list, where each element of the list IS a list, containing the name, the bounding box, and the confidence
#the name is a string, the bounding box is a Rectangle object, and the confidence is a float
def analyzeFileReturn(localfile):
    vision_source = sdk.VisionSource(filename=localfile)
    analysis_options = sdk.ImageAnalysisOptions()
    analysis_options.features = (sdk.ImageAnalysisFeature.OBJECTS)
    analysis_options.model_name = "recyclingai"
    image_analyzer = sdk.ImageAnalyzer(service_options, vision_source, analysis_options)
    result = image_analyzer.analyze()
    if result.reason == sdk.ImageAnalysisResultReason.ANALYZED:
        if result.custom_objects is not None:
            returnList = []
            for object in result.custom_objects:
                babyList = [object.name, object.bounding_box, object.confidence]
                returnList.append(babyList)
        return returnList
    else:
        error_details = sdk.ImageAnalysisErrorDetails.from_result(result)
        print(" Analysis failed.")
        print("   Error reason: {}".format(error_details.reason))
        print("   Error code: {}".format(error_details.error_code))
        print("   Error message: {}".format(error_details.message))

def drawABox(imin,x,y,w,h,col,txt,f,out):
    im = Image.open(imin)
    draw = ImageDraw.Draw(im)
    bbox = [(x, y), (x+w, y+h)]
    draw.rectangle(bbox,outline=col)
    draw.text((x,y), txt, fill=col,font=f)
    im.save(out,"JPEG")

def drawOnImage(filename):
    analyze = analyzeFileReturn(filename)
    objs = []
    for obj in analyze:
        if obj[2] > 0.85:
            objs.append(obj)
    myim = Image.open(filename)
    fontsize = 1
    font = ImageFont.truetype("arial.ttf", fontsize)
    img_fraction = 0.1
    while font.getsize("Leo's Code")[0] < img_fraction*myim.size[0]:
        # iterate until the text size is just larger than the criteria
        fontsize += 1
        font = ImageFont.truetype("arial.ttf", fontsize)
    fontsize -= 1
    font = ImageFont.truetype("arial.ttf", fontsize)
    for object in objs:
        myx = object[1].x
        myy = object[1].y
        myw = object[1].w
        myh = object[1].h
        if object[0] == 'Glass or Plastic': mycol = "blue"
        elif object[0] == 'Metal': mycol = "gray"
        else: mycol = "brown"
        drawABox(filename,myx,myy,myw,myh,mycol,object[0],font,filename)
        print("Drew a box around " + object[0])

if __name__ == "__main__":
    file = sys.argv[1]
    drawOnImage(file)

"""