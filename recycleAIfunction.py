# Resource and key
import azure.ai.vision as sdk
import os

service_options = sdk.VisionServiceOptions("https://compvisleo.cognitiveservices.azure.com/","300b86fa09e84b00bc845058a895ccf7")

#takes in, as a string, the url of a local photo file, and prints out an analysis of the photo, ordered by certainty
def analyzeFile(localfile):
    vision_source = sdk.VisionSource(filename=localfile)   
    analysis_options = sdk.ImageAnalysisOptions()
    analysis_options.features = (sdk.ImageAnalysisFeature.OBJECTS)
    analysis_options.model_name = "recyclingai"
    image_analyzer = sdk.ImageAnalyzer(service_options, vision_source, analysis_options)
    result = image_analyzer.analyze()
    if result.reason == sdk.ImageAnalysisResultReason.ANALYZED:
        if result.custom_objects is not None:
            print(" Custom Objects:")
            for object in result.custom_objects:
                print("   '{}', {} Confidence: {:.4f}".format(object.name, object.bounding_box, object.confidence))
        if result.custom_tags is not None:
            print(" Custom Tags:")
            for tag in result.custom_tags:
                print("   '{}', Confidence {:.4f}".format(tag.name, tag.confidence))
    else:
        error_details = sdk.ImageAnalysisErrorDetails.from_result(result)
        print(" Analysis failed.")
        print("   Error reason: {}".format(error_details.reason))
        print("   Error code: {}".format(error_details.error_code))
        print("   Error message: {}".format(error_details.message))

