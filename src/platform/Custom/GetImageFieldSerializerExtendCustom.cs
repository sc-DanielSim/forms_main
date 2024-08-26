using Sitecore.Diagnostics;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.Pipelines.GetFieldSerializer;

namespace XmCloudSXAStarter.Custom
{
	public class GetImageFieldSerializerExtendCustom : BaseGetFieldSerializer
	{
		public GetImageFieldSerializerExtendCustom(IFieldRenderer fieldRenderer)
			: base(fieldRenderer)
		{
		}

		protected override void SetResult(GetFieldSerializerPipelineArgs args)
		{
			Assert.ArgumentNotNull(args, "args");
			args.Result = new ImageFieldSerializerExtendCustom(FieldRenderer);
		}
	}

}