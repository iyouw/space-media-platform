#include "Demuxer.h"

namespace SpaceMedia
{
  void Demuxer::dispose()
  {
    m_onHeaderParsed = nullptr;
    m_onPacketParsed = nullptr;
  }
}