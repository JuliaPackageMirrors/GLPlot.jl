{{GLSL_VERSION}}

{{in}} vec2 uv_frag;
{{out}} vec4 frag_color;

{{image_type}} image;

{{filterkernel_type}} filterkernel;


uniform vec2 normrange;
uniform float filternorm;


vec4 filter_img(sampler2D kernel, float norm)
{
	ivec2 size = textureSize(kernel, 0);
	vec2 sizef = vec2(size);
	vec2 sizeimgf = vec2(textureSize(image, 0));
    int i = 0;
    int j = 0;
    vec4 accum = vec4(0);
    vec2 windowi;
    ivec2 kerneli;
    for(i;i<size.x;i++)
    {
      for(j;j<size.y;j++)
      {
      	kerneli.x = i;
      	kerneli.y = j;
      	windowi = ((vec2(i,j) - (sizef/2)) / sizeimgf);
        accum += (texelFetch(kernel, kerneli, 0).r * texture(image, uv_frag + windowi)) / norm;
      }
    }
    return vec4(accum.rgb, 1);
}
vec4 filter_img(float kernel, float norm)
{
    return (kernel * texture(image, uv_frag)) / norm;
}
void main(){

	vec4 color = filter_img(filterkernel, filternorm);
	frag_color = normrange.x + (color * (normrange.y - normrange.x));
}
 